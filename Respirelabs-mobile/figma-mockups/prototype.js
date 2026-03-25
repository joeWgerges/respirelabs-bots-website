/* ================================================
   PROTOTYPE.JS — Navigation Engine for Clickable Prototype
   ================================================ */

(function() {
  'use strict';

  // ── Configuration ──
  const TRANSITION_DURATION = 300;
  const MODAL_DURATION = 400;
  const DEBOUNCE_MS = 350;
  const START_SCREEN = 'S1';

  // Tab bar mapping: which screens show which tab as active
  const TAB_MAPPING = {
    Home:    { target: 'S6', screens: ['S5', 'S6', 'S25', 'S26', 'S46', 'S75', 'S76', 'S106'] },
    Track:   { target: 'S9', screens: ['S9', 'S10', 'S17', 'S18', 'S30', 'S37', 'S87', 'S88', 'S90'] },
    Tips:    { target: 'S11', screens: ['S11', 'S28', 'S29', 'S47', 'S49', 'S79', 'S83', 'S92', 'S94', 'S108'] },
    Learn:   { target: 'S12', screens: ['S12', 'S13', 'S31', 'S48', 'S72', 'S91', 'S77', 'S78'] },
    Consult: { target: 'S14', screens: ['S14', 'S15', 'S32', 'S50', 'S51', 'S96', 'S105', 'S95', 'S33'] },
  };

  // Screens that show tab bar
  const SCREENS_WITH_TAB = new Set();

  // ── State ──
  let currentScreen = null;
  let history = [];
  let isAnimating = false;
  let lastNavTime = 0;
  let devToolsCollapsed = false;

  // ── DOM References ──
  let viewport, tabBar, overlay, devCurrent, devBreadcrumb, devSelect, devStats;

  // ── Core Navigation ──

  const Proto = {
    init() {
      viewport = document.getElementById('proto-viewport');
      tabBar = document.getElementById('proto-tab-bar');
      overlay = document.getElementById('proto-modal-overlay');
      devCurrent = document.getElementById('dev-current');
      devBreadcrumb = document.getElementById('dev-breadcrumb');
      devSelect = document.getElementById('dev-select');
      devStats = document.getElementById('dev-stats');

      // Build SCREENS_WITH_TAB from data attributes
      document.querySelectorAll('.proto-screen[data-has-tab="true"]').forEach(el => {
        SCREENS_WITH_TAB.add(el.id);
      });

      // Populate dev tools select
      this.populateDevSelect();

      // Bind all navigation elements
      this.bindNavigation();

      // Bind tab bar
      this.bindTabBar();

      // Bind dev tools
      this.bindDevTools();

      // Bind overlay dismiss
      if (overlay) {
        overlay.addEventListener('click', () => this.dismissModal());
      }

      // Init scroll fade
      this.initScrollFade();

      // Navigate to start screen
      this.navigateTo(START_SCREEN, 'none');

      // Handle auto-delay screens
      this.handleAutoDelay();

      // Update stats
      this.updateStats();
    },

    navigateTo(screenId, transition = 'push', addToHistory = true) {
      // Debounce rapid taps
      const now = Date.now();
      if (now - lastNavTime < DEBOUNCE_MS && transition !== 'none') return;
      lastNavTime = now;

      if (isAnimating) return;

      const nextScreen = document.getElementById(screenId);
      if (!nextScreen) {
        console.warn(`Screen ${screenId} not found`);
        return;
      }

      const prevScreen = currentScreen ? document.getElementById(currentScreen) : null;

      if (currentScreen === screenId) return;

      // Push to history
      if (addToHistory && currentScreen) {
        history.push(currentScreen);
      }

      const prevId = currentScreen;
      currentScreen = screenId;

      // Perform transition
      if (transition === 'none' || !prevScreen) {
        // Instant — just swap
        if (prevScreen) {
          prevScreen.classList.remove('active');
          this.cleanTransitions(prevScreen);
        }
        nextScreen.classList.add('active');
        nextScreen.scrollTop = 0;
      } else {
        isAnimating = true;
        this.animate(prevScreen, nextScreen, transition);
      }

      // Update tab bar
      this.updateTabBar(screenId);

      // Update dev tools
      this.updateDevTools();

      // Handle auto-delay on new screen
      this.handleAutoDelayFor(screenId);
    },

    goBack() {
      if (history.length === 0) return;
      const prevScreen = history.pop();
      this.navigateTo(prevScreen, 'back', false);
    },

    showModal(screenId) {
      if (isAnimating) return;

      const modalScreen = document.getElementById(screenId);
      if (!modalScreen) return;

      if (currentScreen) {
        history.push(currentScreen);
      }

      currentScreen = screenId;

      // Show overlay
      if (overlay) {
        overlay.classList.add('active');
      }

      // Show modal screen
      modalScreen.classList.add('active', 'modal-screen', 'animating');
      modalScreen.style.zIndex = '20';

      isAnimating = true;
      modalScreen.classList.add('transition-slide-in-up');

      setTimeout(() => {
        modalScreen.classList.remove('animating');
        isAnimating = false;
      }, MODAL_DURATION);

      this.updateDevTools();
    },

    dismissModal() {
      if (isAnimating) return;
      if (history.length === 0) return;

      const modalScreen = document.getElementById(currentScreen);
      if (!modalScreen) return;

      isAnimating = true;

      modalScreen.classList.add('animating', 'transition-slide-out-down');

      setTimeout(() => {
        modalScreen.classList.remove('active', 'modal-screen', 'animating');
        this.cleanTransitions(modalScreen);
        modalScreen.style.zIndex = '';

        if (overlay) {
          overlay.classList.remove('active');
        }

        const prevId = history.pop();
        currentScreen = prevId;
        isAnimating = false;

        this.updateTabBar(prevId);
        this.updateDevTools();
      }, TRANSITION_DURATION);
    },

    switchTab(tabName) {
      const tabInfo = TAB_MAPPING[tabName];
      if (!tabInfo) return;
      if (currentScreen === tabInfo.target) return;

      // Clear history for tab switches (fresh start)
      this.navigateTo(tabInfo.target, 'none', true);
    },

    // ── Animation Engine ──

    animate(prevScreen, nextScreen, type) {
      let inAnim, outAnim;

      switch (type) {
        case 'push':
          inAnim = 'transition-slide-in-right';
          outAnim = 'transition-slide-out-left';
          break;
        case 'back':
          inAnim = 'transition-slide-in-left';
          outAnim = 'transition-slide-out-right';
          break;
        case 'modal':
          inAnim = 'transition-slide-in-up';
          outAnim = 'transition-fade-out';
          break;
        case 'dissolve':
          inAnim = 'transition-fade-in';
          outAnim = 'transition-fade-out';
          break;
        case 'tab':
        case 'none':
        default:
          // Instant swap
          prevScreen.classList.remove('active');
          this.cleanTransitions(prevScreen);
          nextScreen.classList.add('active');
          nextScreen.scrollTop = 0;
          isAnimating = false;
          return;
      }

      // Setup
      nextScreen.classList.add('active', 'animating');
      nextScreen.scrollTop = 0;
      prevScreen.classList.add('animating');

      // Start animations
      nextScreen.classList.add(inAnim);
      prevScreen.classList.add(outAnim);

      const duration = type === 'modal' ? MODAL_DURATION : TRANSITION_DURATION;

      setTimeout(() => {
        prevScreen.classList.remove('active', 'animating');
        nextScreen.classList.remove('animating');
        this.cleanTransitions(prevScreen);
        this.cleanTransitions(nextScreen);
        isAnimating = false;
      }, duration + 50);
    },

    cleanTransitions(el) {
      if (!el) return;
      el.classList.remove(
        'transition-slide-in-right', 'transition-slide-out-left',
        'transition-slide-in-left', 'transition-slide-out-right',
        'transition-slide-in-up', 'transition-slide-out-down',
        'transition-fade-in', 'transition-fade-out',
        'animating'
      );
    },

    // ── Tab Bar ──

    updateTabBar(screenId) {
      if (!tabBar) return;

      if (SCREENS_WITH_TAB.has(screenId)) {
        tabBar.classList.remove('hidden');
      } else {
        tabBar.classList.add('hidden');
      }

      // Update active tab
      const tabItems = tabBar.querySelectorAll('.proto-tab-item');
      tabItems.forEach(item => {
        const tabName = item.dataset.tab;
        const tabInfo = TAB_MAPPING[tabName];
        if (tabInfo && tabInfo.screens.includes(screenId)) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
    },

    bindTabBar() {
      if (!tabBar) return;
      tabBar.querySelectorAll('.proto-tab-item').forEach(item => {
        item.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          const tabName = item.dataset.tab;
          this.switchTab(tabName);
        });
      });
    },

    // ── Auto Delay ──

    handleAutoDelay() {
      // Only handle for start screen
    },

    handleAutoDelayFor(screenId) {
      const screen = document.getElementById(screenId);
      if (!screen) return;
      const delay = screen.dataset.autoDelay;
      if (!delay) return;

      const target = screen.dataset.autoTarget;
      if (!target) return;

      const ms = parseInt(delay, 10);
      setTimeout(() => {
        if (currentScreen === screenId) {
          const transition = screen.dataset.autoTransition || 'dissolve';
          this.navigateTo(target, transition);
        }
      }, ms);
    },

    // ── Bind Navigation ──

    bindNavigation() {
      // Use event delegation on the viewport
      viewport.addEventListener('click', (e) => {
        // Find closest interactive element
        const navEl = e.target.closest('[data-nav]');
        const backEl = e.target.closest('[data-back]');
        const modalEl = e.target.closest('[data-modal]');
        const dismissEl = e.target.closest('[data-dismiss]');

        if (dismissEl) {
          e.preventDefault();
          e.stopPropagation();
          this.dismissModal();
          return;
        }

        if (modalEl) {
          e.preventDefault();
          e.stopPropagation();
          const target = modalEl.dataset.modal;
          this.showModal(target);
          return;
        }

        if (backEl) {
          e.preventDefault();
          e.stopPropagation();
          this.goBack();
          return;
        }

        if (navEl) {
          e.preventDefault();
          e.stopPropagation();
          const target = navEl.dataset.nav;
          const transition = navEl.dataset.transition || 'push';
          this.navigateTo(target, transition);
          return;
        }
      });
    },

    // ── Dev Tools ──

    populateDevSelect() {
      if (!devSelect) return;
      const screens = document.querySelectorAll('.proto-screen');
      screens.forEach(screen => {
        const opt = document.createElement('option');
        opt.value = screen.id;
        const label = screen.dataset.label || screen.id;
        opt.textContent = `${screen.id} — ${label}`;
        devSelect.appendChild(opt);
      });
    },

    updateDevTools() {
      if (devCurrent) {
        devCurrent.textContent = currentScreen || '—';
      }
      if (devBreadcrumb) {
        const trail = [...history.slice(-5), currentScreen].filter(Boolean);
        devBreadcrumb.textContent = trail.join(' → ');
      }
      if (devSelect) {
        devSelect.value = currentScreen || '';
      }
    },

    updateStats() {
      if (!devStats) return;
      const totalScreens = document.querySelectorAll('.proto-screen').length;
      const totalNavs = document.querySelectorAll('[data-nav]').length;
      const totalBacks = document.querySelectorAll('[data-back]').length;
      devStats.textContent = `${totalScreens} screens · ${totalNavs + totalBacks} connections`;
    },

    bindDevTools() {
      // Select dropdown
      if (devSelect) {
        devSelect.addEventListener('change', (e) => {
          const target = e.target.value;
          if (target) this.navigateTo(target, 'dissolve');
        });
      }

      // Toggle collapse
      const toggleBtn = document.getElementById('dev-toggle');
      const devBody = document.getElementById('dev-body');
      if (toggleBtn && devBody) {
        toggleBtn.addEventListener('click', () => {
          devToolsCollapsed = !devToolsCollapsed;
          devBody.classList.toggle('collapsed', devToolsCollapsed);
          toggleBtn.textContent = devToolsCollapsed ? 'Show' : 'Hide';
        });
      }

      // Reset button
      const resetBtn = document.getElementById('dev-reset');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          history = [];
          this.navigateTo(START_SCREEN, 'dissolve', false);
        });
      }

      // Back button
      const backBtn = document.getElementById('dev-back');
      if (backBtn) {
        backBtn.addEventListener('click', () => {
          this.goBack();
        });
      }
    },

    // ── Scroll Fade Detection ──
    initScrollFade() {
      document.querySelectorAll('.proto-screen .phone').forEach(phone => {
        phone.addEventListener('scroll', () => {
          const scrollable = phone.scrollHeight - phone.clientHeight;
          const scrolled = phone.scrollTop;
          if (scrollable > 50 && scrolled < scrollable - 20) {
            phone.classList.add('scrolled');
          } else {
            phone.classList.remove('scrolled');
          }
        });
      });
    },

    // ── Keyboard Shortcuts ──
    initKeyboard() {
      document.addEventListener('keydown', (e) => {
        // Escape = go back
        if (e.key === 'Escape') {
          e.preventDefault();
          this.goBack();
        }
        // Alt+D = toggle dev tools
        if (e.key === 'd' && e.altKey) {
          e.preventDefault();
          const devTools = document.getElementById('proto-dev-tools');
          if (devTools) {
            devTools.style.display = devTools.style.display === 'none' ? '' : 'none';
          }
        }
      });
    }
  };

  // ── Initialize on DOM Ready ──
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      Proto.init();
      Proto.initKeyboard();
    });
  } else {
    Proto.init();
    Proto.initKeyboard();
  }

  // Expose globally for debugging
  window.Proto = Proto;

})();
