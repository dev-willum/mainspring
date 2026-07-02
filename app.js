/* Mainspring — landing page interactions */
(function () {
  "use strict";

  /* Header hairline on scroll ------------------------------------ */
  var header = document.querySelector(".site-header");
  var onScroll = function () {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Mobile nav ---------------------------------------------------- */
  var toggle = document.getElementById("nav-toggle");
  var nav = document.getElementById("site-nav");
  toggle.addEventListener("click", function () {
    var open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  nav.addEventListener("click", function (e) {
    if (e.target.tagName === "A") {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });

  /* Status page demo ---------------------------------------------- */
  var TICKETS = {
    "MS-1038": {
      item: "Omega Seamaster, cal. 552",
      owner: "Checked in for R. Whitfield on 2 June",
      steps: [
        { name: "Received", note: "2 June · photographed at the counter", state: "done" },
        { name: "Diagnosed", note: "5 June · worn mainspring barrel, dry pivots", state: "done" },
        { name: "Estimate approved", note: "6 June · approved by text message", state: "done" },
        { name: "Awaiting parts", note: "Barrel on order from Switzerland, due mid-July", state: "current" },
        { name: "On the bench", note: "", state: "pending" },
        { name: "Ready for collection", note: "", state: "pending" }
      ]
    },
    "MS-1041": {
      item: "Olympia SM3, 1957",
      owner: "Checked in for D. Okafor on 14 June",
      steps: [
        { name: "Received", note: "14 June", state: "done" },
        { name: "Diagnosed", note: "16 June · sluggish segment, perished feet", state: "done" },
        { name: "Estimate approved", note: "16 June · approved by email", state: "done" },
        { name: "On the bench", note: "Cleaned and adjusted; new platen fitted today", state: "current",
          photo: "New platen fitted · photo added by the shop" },
        { name: "Ready for collection", note: "Promised 11 July", state: "pending" }
      ]
    },
    "MS-1042": {
      item: "Vienna regulator, 8-day",
      owner: "Checked in for M. Ferreira on 20 June",
      steps: [
        { name: "Received", note: "20 June · movement and case photographed", state: "done" },
        { name: "Diagnosed", note: "24 June · bushings worn at 3rd wheel, suspension spring tired", state: "done" },
        { name: "Estimate sent", note: "Waiting on your approval. Check your email", state: "current" },
        { name: "On the bench", note: "", state: "pending" },
        { name: "Ready for collection", note: "", state: "pending" }
      ],
      thread: [
        { who: "Hartley & Sons", side: "shop",
          text: "There's some wear on the dial from being wound all those years. We can polish it up or leave it be, costs the same either way." },
        { who: "M. Ferreira", side: "owner",
          text: "Leave it please. It was my grandad's, I'd rather it still looked like his." },
        { who: "Hartley & Sons", side: "shop",
          text: "Sounds good, we'll just service the movement and leave the dial alone." }
      ]
    }
  };

  var form = document.getElementById("status-form");
  var input = document.getElementById("ticket-input");
  var result = document.getElementById("status-result");

  function renderTicket(id) {
    var key = id.trim().toUpperCase();
    var t = TICKETS[key];
    if (!key) return;
    if (!t) {
      result.innerHTML =
        '<p class="status-miss">No ticket &ldquo;' + escapeHtml(key) +
        '&rdquo; here. This demo only knows MS-1038, MS-1041 and MS-1042.</p>';
      return;
    }
    var PHOTO_SVG =
      '<svg viewBox="0 0 24 24" aria-hidden="true">' +
      '<circle cx="12" cy="12" r="6.5" fill="none" stroke="currentColor" stroke-width="1.3"/>' +
      '<circle cx="12" cy="12" r="1.4" fill="currentColor"/>' +
      '<path d="M12 5.5v3.2 M12 15.3v3.2 M5.5 12h3.2 M15.3 12h3.2" stroke="currentColor" stroke-width="1.3"/>' +
      "</svg>";
    var steps = t.steps.map(function (s) {
      return (
        '<li class="' + s.state + '">' +
        '<span class="step-name">' + s.name + "</span>" +
        (s.note ? '<span class="step-note">' + s.note + "</span>" : "") +
        (s.photo
          ? '<figure class="step-photo"><span class="thumb">' + PHOTO_SVG +
            "</span><figcaption>" + s.photo + "</figcaption></figure>"
          : "") +
        "</li>"
      );
    }).join("");
    var thread = "";
    if (t.thread) {
      thread =
        '<div class="thread"><p class="thread-title">Messages</p>' +
        t.thread.map(function (m) {
          return (
            '<div class="msg ' + m.side + '">' +
            '<span class="who">' + m.who + "</span>" +
            escapeHtml(m.text) + "</div>"
          );
        }).join("") +
        '<form class="thread-reply" id="thread-reply">' +
        '<input type="text" name="reply" placeholder="Write to the shop" aria-label="Write to the shop" autocomplete="off">' +
        '<button type="submit" class="btn btn-solid">Send</button></form>' +
        "</div>";
    }
    result.innerHTML =
      '<div class="status-card">' +
      "<h4>" + t.item + "</h4>" +
      '<p class="status-owner"><span class="mono">' + key + "</span> &middot; " + t.owner + "</p>" +
      '<ol class="timeline">' + steps + "</ol>" +
      thread +
      "</div>";
  }

  /* Demo-only: replies in the message thread appear in place */
  result.addEventListener("submit", function (e) {
    var f = e.target.closest(".thread-reply");
    if (!f) return;
    e.preventDefault();
    var text = f.reply.value.trim();
    if (!text) return;
    var msg = document.createElement("div");
    msg.className = "msg owner";
    msg.innerHTML = '<span class="who">You</span>' + escapeHtml(text);
    f.parentNode.insertBefore(msg, f);
    f.reply.value = "";
  });

  function escapeHtml(s) {
    return s.replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    renderTicket(input.value);
  });

  document.querySelectorAll(".status-samples button").forEach(function (btn) {
    btn.addEventListener("click", function () {
      input.value = btn.dataset.ticket;
      renderTicket(btn.dataset.ticket);
    });
  });

  /* Pricing: monthly / annual ------------------------------------- */
  var toggleOpts = document.querySelectorAll(".toggle-opt");
  toggleOpts.forEach(function (opt) {
    opt.addEventListener("click", function () {
      toggleOpts.forEach(function (o) { o.classList.remove("is-active"); });
      opt.classList.add("is-active");
      var period = opt.dataset.period;
      document.querySelectorAll(".plan-price .amount").forEach(function (el) {
        el.textContent = "$" + el.dataset[period];
      });
    });
  });

  /* Waitlist form --------------------------------------------------
     Posts to the Formspree endpoint in the form's action attribute.
     Set your form ID once, in index.html. */
  var wForm = document.getElementById("waitlist-form");
  var wNote = document.getElementById("waitlist-note");
  wForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var btn = wForm.querySelector("button[type=submit]");
    btn.disabled = true;
    btn.textContent = "Adding you…";
    fetch(wForm.action, {
      method: "POST",
      body: new FormData(wForm),
      headers: { Accept: "application/json" }
    })
      .then(function (res) {
        if (!res.ok) throw new Error("bad status " + res.status);
        wForm.outerHTML =
          '<p class="waitlist-done">You&rsquo;re on the list. We&rsquo;ll write when your bench is ready.</p>';
        wNote.className = "form-note is-success";
        wNote.textContent = "Check your inbox for a confirmation.";
      })
      .catch(function () {
        btn.disabled = false;
        btn.textContent = "Join the waitlist";
        wNote.className = "form-note is-error";
        wNote.textContent =
          "That didn’t go through. Please try again, or email hello@mainspring.example.";
      });
  });

  /* Footer year ---------------------------------------------------- */
  document.getElementById("year").textContent = new Date().getFullYear();
})();
