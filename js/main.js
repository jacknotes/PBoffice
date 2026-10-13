/* ============================================================
   绍兴芃博网络科技有限公司 官网交互脚本
   ============================================================ */
(function () {
  "use strict";

  /* ---------- 顶部导航：滚动状态 + 回到顶部 ---------- */
  var header = document.getElementById("siteHeader");
  var toTop = document.getElementById("toTop");

  function onScroll() {
    var y = window.scrollY || document.documentElement.scrollTop;
    header.classList.toggle("scrolled", y > 10);
    toTop.classList.toggle("show", y > 420);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  toTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ---------- 移动端菜单 ---------- */
  var navToggle = document.getElementById("navToggle");
  var mainNav = document.getElementById("mainNav");

  navToggle.addEventListener("click", function () {
    var open = document.body.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  mainNav.addEventListener("click", function (e) {
    if (e.target.tagName === "A") {
      document.body.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });

  /* ---------- 滚动高亮当前导航（scrollspy） ---------- */
  var navLinks = Array.prototype.slice.call(mainNav.querySelectorAll("a"));
  var sections = navLinks
    .map(function (a) { return document.querySelector(a.getAttribute("href")); })
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = "#" + entry.target.id;
        navLinks.forEach(function (a) {
          a.classList.toggle("active", a.getAttribute("href") === id);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });

    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- 业务体系 Tab 切换 ---------- */
  var tabs = document.querySelectorAll(".tab");
  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      var target = tab.getAttribute("data-tab");

      tabs.forEach(function (t) {
        var active = t === tab;
        t.classList.toggle("active", active);
        t.setAttribute("aria-selected", active ? "true" : "false");
      });

      document.querySelectorAll(".tab-panel").forEach(function (panel) {
        panel.classList.remove("active");
      });
      var panel = document.getElementById("tab-" + target);
      if (panel) {
        panel.classList.add("active");
        /* 面板内元素重新触发进场动画 */
        panel.querySelectorAll(".reveal").forEach(function (el) {
          el.classList.remove("in");
          revealObserver.observe(el);
        });
      }
    });
  });

  /* ---------- 滚动进场动画 ---------- */
  function makeRevealObserver() {
    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("in"); });
      return null;
    }
    return new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  }

  var revealObserver = makeRevealObserver();
  if (revealObserver) {
    document.querySelectorAll(".reveal").forEach(function (el) { revealObserver.observe(el); });
  }

  /* ---------- 首屏数字滚动 ---------- */
  function animateCount(el) {
    var target = parseInt(el.getAttribute("data-count"), 10) || 0;
    var duration = 1400;
    var start = null;

    function tick(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3); /* easeOutCubic */
      el.textContent = Math.round(target * eased);
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  var statsBox = document.getElementById("heroStats");
  if (statsBox) {
    var counted = false;
    var statObserver = "IntersectionObserver" in window
      ? new IntersectionObserver(function (entries, observer) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting && !counted) {
              counted = true;
              statsBox.querySelectorAll("[data-count]").forEach(animateCount);
              observer.disconnect();
            }
          });
        }, { threshold: 0.3 })
      : null;

    if (statObserver) {
      statObserver.observe(statsBox);
    } else {
      statsBox.querySelectorAll("[data-count]").forEach(animateCount);
    }
  }
})();
