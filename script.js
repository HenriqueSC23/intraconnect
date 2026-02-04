(function () {
  const sentScrollMarks = new Set();

  function trackEvent(eventName, params) {
    const payload = {
      event: eventName,
      ...params,
      timestamp: new Date().toISOString(),
    };

    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push(payload);
    } else {
      console.info("[tracking]", payload);
    }
  }

  function setupClickTracking() {
    document.querySelectorAll("[data-track]").forEach((node) => {
      node.addEventListener("click", () => {
        trackEvent("cta_click", {
          cta_id: node.getAttribute("data-track"),
          label: node.textContent.trim(),
        });
      });
    });
  }

  function setupScrollTracking() {
    const thresholds = [50, 75];

    function onScroll() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight <= 0 ? 100 : Math.round((scrollTop / docHeight) * 100);

      thresholds.forEach((mark) => {
        if (progress >= mark && !sentScrollMarks.has(mark)) {
          sentScrollMarks.add(mark);
          trackEvent("scroll_depth", { percent: mark });
        }
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
  }

  function setupFaq() {
    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach((item) => {
      item.addEventListener("click", () => {
        const expanded = item.getAttribute("aria-expanded") === "true";
        item.setAttribute("aria-expanded", String(!expanded));
        item.querySelector("span:last-child").textContent = expanded ? "+" : "-";

        if (!expanded) {
          trackEvent("faq_click", {
            faq_id: item.getAttribute("data-track") || item.querySelector("span:first-child")?.textContent,
          });
        }
      });
    });
  }

  function setupLeadForm() {
    const form = document.getElementById("lead-form");
    const feedback = document.getElementById("form-feedback");
    if (!form || !feedback) return;

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!form.checkValidity()) {
        feedback.style.color = "#cc6a1d";
        feedback.textContent = "Preencha todos os campos obrigatorios para continuar.";
        return;
      }

      const formData = new FormData(form);
      const lead = Object.fromEntries(formData.entries());

      trackEvent("form_submit", {
        form_id: "lead_form_intraconnect",
        colaboradores: lead.colaboradores,
        unidades: lead.unidades,
        desafio: lead.desafio,
      });

      feedback.style.color = "#0d9f6e";
      feedback.textContent = "Obrigado! Seu pedido foi enviado. Retornaremos em breve.";
      form.reset();
    });
  }

  function setupYear() {
    const yearNode = document.getElementById("year");
    if (yearNode) {
      yearNode.textContent = new Date().getFullYear();
    }
  }

  setupYear();
  setupClickTracking();
  setupScrollTracking();
  setupFaq();
  setupLeadForm();
})();

