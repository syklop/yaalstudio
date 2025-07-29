import { resolveComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderClass, ssrIncludeBooleanAttr, ssrRenderList, ssrRenderComponent, ssrRenderStyle, ssrLooseContain, ssrLooseEqual, ssrRenderAttr } from 'vue/server-renderer';
import { _ as _export_sfc, n as navigateTo } from './server.mjs';
import { useAuthStore } from './auth-C8D5J8YS.mjs';
import '../_/nitro.mjs';
import 'googleapis';
import 'jsonwebtoken';
import '@prisma/client';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'consola';
import '@iconify/utils';
import 'node:crypto';
import 'node:fs';
import 'node:path';
import 'pinia';
import 'vue-router';
import 'tailwindcss/colors';
import '@iconify/vue';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';

const _sfc_main$6 = {
  name: "StatCard",
  props: {
    title: {
      type: String,
      required: true
    },
    value: {
      type: [Number, String],
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: "blue",
      validator: (value) => ["blue", "green", "purple", "yellow", "red"].includes(value)
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    formattedValue() {
      if (typeof this.value === "number") {
        return this.value.toLocaleString("fr-FR");
      }
      return this.value;
    }
  }
};
function _sfc_ssrRender$6(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "stat-card" }, _attrs))} data-v-e6733c9f><div class="stat-card-content" data-v-e6733c9f><div class="stat-info" data-v-e6733c9f><p class="stat-label" data-v-e6733c9f>${ssrInterpolate($props.title)}</p>`);
  if ($props.loading) {
    _push(`<div class="stat-loading" data-v-e6733c9f><div class="loading-bar" data-v-e6733c9f></div></div>`);
  } else {
    _push(`<p class="stat-value" data-v-e6733c9f>${ssrInterpolate($options.formattedValue)}</p>`);
  }
  _push(`</div><div class="${ssrRenderClass(`stat-icon ${$props.color}`)}" data-v-e6733c9f>`);
  if ($props.icon === "users") {
    _push(`<svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-e6733c9f><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" data-v-e6733c9f></path></svg>`);
  } else if ($props.icon === "calendar") {
    _push(`<svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-e6733c9f><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" data-v-e6733c9f></path></svg>`);
  } else if ($props.icon === "trending-up") {
    _push(`<svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-e6733c9f><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" data-v-e6733c9f></path></svg>`);
  } else if ($props.icon === "chart-bar") {
    _push(`<svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-e6733c9f><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-v-e6733c9f></path></svg>`);
  } else {
    _push(`<svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-e6733c9f><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" data-v-e6733c9f></path></svg>`);
  }
  _push(`</div></div></div>`);
}
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/dashboard/StatCard.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const StatCard = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["ssrRender", _sfc_ssrRender$6], ["__scopeId", "data-v-e6733c9f"]]);
const _sfc_main$5 = {
  name: "StatsSection",
  components: {
    StatCard
  },
  props: {
    stats: {
      type: Object,
      default: () => ({})
    },
    loading: {
      type: Boolean,
      default: false
    }
  }
};
function _sfc_ssrRender$5(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_StatCard = resolveComponent("StatCard");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "stats-section" }, _attrs))} data-v-0776124a><div class="stats-grid" data-v-0776124a>`);
  _push(ssrRenderComponent(_component_StatCard, {
    title: "Total Contacts",
    value: $props.stats.totalContacts || 0,
    icon: "users",
    color: "blue",
    loading: $props.loading
  }, null, _parent));
  _push(ssrRenderComponent(_component_StatCard, {
    title: "Aujourd'hui",
    value: $props.stats.todayContacts || 0,
    icon: "calendar",
    color: "green",
    loading: $props.loading
  }, null, _parent));
  _push(ssrRenderComponent(_component_StatCard, {
    title: "Cette semaine",
    value: $props.stats.weekContacts || 0,
    icon: "trending-up",
    color: "purple",
    loading: $props.loading
  }, null, _parent));
  _push(ssrRenderComponent(_component_StatCard, {
    title: "Ce mois",
    value: $props.stats.monthContacts || 0,
    icon: "chart-bar",
    color: "yellow",
    loading: $props.loading
  }, null, _parent));
  _push(`</div>`);
  if (!$props.loading && (!$props.stats.totalContacts || $props.stats.totalContacts === 0)) {
    _push(`<div class="empty-state" data-v-0776124a><div class="empty-icon" data-v-0776124a><svg fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-0776124a><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-v-0776124a></path></svg></div><h3 class="empty-title" data-v-0776124a>Aucune donn\xE9e disponible</h3><p class="empty-description" data-v-0776124a> Les statistiques appara\xEEtront ici d\xE8s que vous aurez des contacts. </p></div>`);
  } else {
    _push(`<!---->`);
  }
  if (!$props.loading && $props.stats.totalContacts > 0) {
    _push(`<div class="stats-details" data-v-0776124a><div class="stats-card" data-v-0776124a><h3 class="stats-card-title" data-v-0776124a>R\xE9partition par statut</h3><div class="stats-list" data-v-0776124a><!--[-->`);
    ssrRenderList($props.stats.byStatus || [], (status) => {
      _push(`<div class="stats-item" data-v-0776124a><span class="status-label" data-v-0776124a>${ssrInterpolate(status.status)}</span><div class="progress-container" data-v-0776124a><div class="progress-bar" data-v-0776124a><div class="progress-fill blue" style="${ssrRenderStyle({ width: `${status.count / $props.stats.totalContacts * 100}%` })}" data-v-0776124a></div></div><span class="status-count" data-v-0776124a>${ssrInterpolate(status.count)}</span></div></div>`);
    });
    _push(`<!--]--></div></div><div class="stats-card" data-v-0776124a><h3 class="stats-card-title" data-v-0776124a>Sources principales</h3><div class="stats-list" data-v-0776124a><!--[-->`);
    ssrRenderList($props.stats.topSources || [], (source) => {
      _push(`<div class="stats-item" data-v-0776124a><span class="status-label" data-v-0776124a>${ssrInterpolate(source.source)}</span><div class="progress-container" data-v-0776124a><div class="progress-bar" data-v-0776124a><div class="progress-fill green" style="${ssrRenderStyle({ width: `${source.count / $props.stats.totalContacts * 100}%` })}" data-v-0776124a></div></div><span class="status-count" data-v-0776124a>${ssrInterpolate(source.count)}</span></div></div>`);
    });
    _push(`<!--]--></div></div></div>`);
  } else {
    _push(`<!---->`);
  }
  if (!$props.loading && $props.stats.totalContacts > 0) {
    _push(`<div class="metrics-grid" data-v-0776124a><div class="metric-card" data-v-0776124a><div class="metric-content" data-v-0776124a><div class="metric-info" data-v-0776124a><p class="metric-label" data-v-0776124a>Taux de conversion</p><p class="metric-value" data-v-0776124a>${ssrInterpolate($props.stats.conversionRate || "0")}% </p></div><div class="metric-icon blue" data-v-0776124a><svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-0776124a><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" data-v-0776124a></path></svg></div></div></div><div class="metric-card" data-v-0776124a><div class="metric-content" data-v-0776124a><div class="metric-info" data-v-0776124a><p class="metric-label" data-v-0776124a>Visiteurs uniques</p><p class="metric-value" data-v-0776124a>${ssrInterpolate($props.stats.uniqueVisitors || "0")}</p></div><div class="metric-icon green" data-v-0776124a><svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-0776124a><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" data-v-0776124a></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" data-v-0776124a></path></svg></div></div></div><div class="metric-card" data-v-0776124a><div class="metric-content" data-v-0776124a><div class="metric-info" data-v-0776124a><p class="metric-label" data-v-0776124a>Dur\xE9e moy. session</p><p class="metric-value" data-v-0776124a>${ssrInterpolate($props.stats.avgSessionDuration || "0")}min </p></div><div class="metric-icon purple" data-v-0776124a><svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-0776124a><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" data-v-0776124a></path></svg></div></div></div></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div>`);
}
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/dashboard/StatsSection.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const StatsSection = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["ssrRender", _sfc_ssrRender$5], ["__scopeId", "data-v-0776124a"]]);
const _sfc_main$4 = {
  name: "ContactDetailModal",
  props: {
    contact: {
      type: Object,
      required: true
    }
  },
  emits: ["close", "update-status"],
  mounted() {
    (void 0).body.style.overflow = "hidden";
  },
  beforeUnmount() {
    (void 0).body.style.overflow = "";
  },
  methods: {
    getStatusClass(status) {
      const classes = {
        "Non trait\xE9": "status-pending",
        "Trait\xE9": "status-completed",
        "Relanc\xE9": "status-follow-up"
      };
      return classes[status] || "status-default";
    },
    formatDate(dateString) {
      try {
        return new Intl.DateTimeFormat("fr-FR", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit"
        }).format(new Date(dateString));
      } catch {
        return dateString;
      }
    },
    getBrowserInfo(userAgent) {
      if (!userAgent) return "Inconnu";
      if (userAgent.includes("Chrome")) return "Chrome";
      if (userAgent.includes("Firefox")) return "Firefox";
      if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) return "Safari";
      if (userAgent.includes("Edge")) return "Edge";
      if (userAgent.includes("Opera")) return "Opera";
      return "Autre";
    },
    sendEmail() {
      console.log("Envoyer email \xE0:", this.contact.email);
      this.$emit("close");
    }
  }
};
function _sfc_ssrRender$4(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "modal-overlay" }, _attrs))} data-v-65055962><div class="modal-content" data-v-65055962><div class="modal-header" data-v-65055962><h3 class="modal-title" data-v-65055962>D\xE9tails du contact</h3><button class="close-button" data-v-65055962><svg class="close-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-65055962><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-v-65055962></path></svg></button></div><div class="modal-body" data-v-65055962><div class="info-section" data-v-65055962><div class="info-item" data-v-65055962><label class="info-label" data-v-65055962>Nom</label><p class="info-value" data-v-65055962>${ssrInterpolate($props.contact.firstName)}</p></div><div class="info-item" data-v-65055962><label class="info-label" data-v-65055962>Email</label><p class="info-value" data-v-65055962>${ssrInterpolate($props.contact.email)}</p></div>`);
  if ($props.contact.phone) {
    _push(`<div class="info-item" data-v-65055962><label class="info-label" data-v-65055962>T\xE9l\xE9phone</label><p class="info-value" data-v-65055962>${ssrInterpolate($props.contact.phone)}</p></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<div class="info-item" data-v-65055962><label class="info-label" data-v-65055962>Source</label><span class="source-badge" data-v-65055962>${ssrInterpolate($props.contact.source)}</span></div><div class="info-item" data-v-65055962><label class="info-label" data-v-65055962>Statut</label><select${ssrRenderAttr("value", $props.contact.status)} class="${ssrRenderClass(["status-select", $options.getStatusClass($props.contact.status)])}" data-v-65055962><option value="Non trait\xE9" data-v-65055962>Non trait\xE9</option><option value="Trait\xE9" data-v-65055962>Trait\xE9</option><option value="Relanc\xE9" data-v-65055962>Relanc\xE9</option></select></div></div><div class="metadata-section" data-v-65055962><div class="info-item" data-v-65055962><label class="info-label" data-v-65055962>Date d&#39;inscription</label><p class="info-value" data-v-65055962>${ssrInterpolate($options.formatDate($props.contact.createdAt))}</p></div>`);
  if ($props.contact.updatedAt !== $props.contact.createdAt) {
    _push(`<div class="info-item" data-v-65055962><label class="info-label" data-v-65055962>Derni\xE8re modification</label><p class="info-value" data-v-65055962>${ssrInterpolate($options.formatDate($props.contact.updatedAt))}</p></div>`);
  } else {
    _push(`<!---->`);
  }
  if ($props.contact.countryCode) {
    _push(`<div class="info-item" data-v-65055962><label class="info-label" data-v-65055962>Pays</label><p class="info-value" data-v-65055962>${ssrInterpolate($props.contact.countryCode)}</p></div>`);
  } else {
    _push(`<!---->`);
  }
  if ($props.contact.ipAddress && $props.contact.ipAddress !== "unknown") {
    _push(`<div class="info-item" data-v-65055962><label class="info-label" data-v-65055962>Adresse IP</label><p class="info-value mono" data-v-65055962>${ssrInterpolate($props.contact.ipAddress)}</p></div>`);
  } else {
    _push(`<!---->`);
  }
  if ($props.contact.userAgent) {
    _push(`<div class="info-item" data-v-65055962><label class="info-label" data-v-65055962>Navigateur</label><p class="info-value truncated"${ssrRenderAttr("title", $props.contact.userAgent)} data-v-65055962>${ssrInterpolate($options.getBrowserInfo($props.contact.userAgent))}</p></div>`);
  } else {
    _push(`<!---->`);
  }
  if ($props.contact.referrer) {
    _push(`<div class="info-item" data-v-65055962><label class="info-label" data-v-65055962>R\xE9f\xE9rent</label><p class="info-value truncated"${ssrRenderAttr("title", $props.contact.referrer)} data-v-65055962>${ssrInterpolate($props.contact.referrer)}</p></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div></div><div class="modal-footer" data-v-65055962><button class="btn btn-secondary" data-v-65055962> Fermer </button><button class="btn btn-primary" data-v-65055962> Envoyer un email </button></div></div></div>`);
}
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/dashboard/ContactDetailModal.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const ContactDetailModal = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["ssrRender", _sfc_ssrRender$4], ["__scopeId", "data-v-65055962"]]);
const _sfc_main$3 = {
  name: "SaveTemplateModal",
  props: {
    emailData: {
      type: Object,
      required: true
    }
  },
  emits: ["close", "save"],
  mounted() {
    (void 0).body.style.overflow = "hidden";
  },
  beforeUnmount() {
    (void 0).body.style.overflow = "";
  },
  data() {
    return {
      templateName: "",
      templateDescription: ""
    };
  },
  methods: {
    saveTemplate() {
      if (!this.templateName.trim()) return;
      this.$emit("save", {
        name: this.templateName.trim(),
        description: this.templateDescription.trim()
      });
    }
  }
};
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "modal-overlay" }, _attrs))} data-v-4c38d626><div class="modal-container" data-v-4c38d626><div class="modal-content" data-v-4c38d626><div class="modal-header" data-v-4c38d626><h3 class="modal-title" data-v-4c38d626>Sauvegarder le template</h3><button class="close-button" data-v-4c38d626><svg class="close-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-4c38d626><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-v-4c38d626></path></svg></button></div><form class="modal-form" data-v-4c38d626><div class="form-group" data-v-4c38d626><label class="form-label" data-v-4c38d626> Nom du template <span class="required" data-v-4c38d626>*</span></label><input${ssrRenderAttr("value", $data.templateName)} type="text" required placeholder="Ex: Email de bienvenue personnalis\xE9" class="form-input" data-v-4c38d626></div><div class="form-group" data-v-4c38d626><label class="form-label" data-v-4c38d626> Description (optionnel) </label><textarea rows="3" placeholder="Description du template..." class="form-textarea" data-v-4c38d626>${ssrInterpolate($data.templateDescription)}</textarea></div><div class="preview-section" data-v-4c38d626><h4 class="preview-title" data-v-4c38d626>Aper\xE7u du template :</h4><div class="preview-content" data-v-4c38d626><div class="preview-subject" data-v-4c38d626>${ssrInterpolate($props.emailData.subject)}</div><div class="preview-message" data-v-4c38d626>${ssrInterpolate($props.emailData.message.substring(0, 100))}...</div></div></div><div class="modal-footer" data-v-4c38d626><button type="button" class="btn btn-secondary" data-v-4c38d626> Annuler </button><button type="submit"${ssrIncludeBooleanAttr(!$data.templateName.trim()) ? " disabled" : ""} class="btn btn-primary" data-v-4c38d626> Sauvegarder </button></div></form></div></div></div>`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/dashboard/SaveTemplateModal.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const SaveTemplateModal = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$3], ["__scopeId", "data-v-4c38d626"]]);
const _sfc_main$2 = {
  name: "ContactsEmailsSection",
  components: {
    ContactDetailModal,
    SaveTemplateModal
  },
  props: {
    contacts: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    },
    pagination: {
      type: Object,
      default: () => ({
        page: 1,
        limit: 20,
        total: 0,
        pages: 1,
        hasNext: false,
        hasPrev: false
      })
    },
    filters: {
      type: Object,
      default: () => ({
        search: "",
        status: "",
        source: ""
      })
    },
    selectedContacts: {
      type: Array,
      default: () => []
    }
  },
  emits: [
    "update-filters",
    "load-contacts",
    "select-contact",
    "select-all",
    "update-status",
    "send-email",
    "clear-selection"
  ],
  data() {
    return {
      localFilters: { ...this.filters },
      searchTimeout: null,
      hoveredContact: null,
      // Email composer
      showEmailComposer: false,
      emailRecipients: [],
      emailData: {
        subject: "",
        message: ""
      },
      selectedTemplate: "",
      sending: false,
      // Templates
      emailTemplates: [
        {
          id: "welcome",
          name: "Email de bienvenue",
          subject: "Bienvenue {firstName} !",
          message: "Bonjour {firstName},\n\nMerci de vous \xEAtre inscrit(e) \xE0 YaalStudio..."
        },
        {
          id: "follow-up",
          name: "Email de relance",
          subject: "Suite \xE0 votre inscription",
          message: "Bonjour {firstName},\n\nJ'esp\xE8re que vous allez bien..."
        }
      ],
      // Modals
      showContactDetail: false,
      selectedContactForDetail: null,
      showSaveTemplate: false,
      showAllRecipients: false
    };
  },
  computed: {
    isAllSelected() {
      return this.contacts.length > 0 && this.selectedContacts.length === this.contacts.length;
    },
    isPartialSelected() {
      return this.selectedContacts.length > 0 && this.selectedContacts.length < this.contacts.length;
    },
    visiblePages() {
      const current = this.pagination.page;
      const total = this.pagination.pages;
      const pages = [];
      for (let i = Math.max(1, current - 2); i <= Math.min(total, current + 2); i++) {
        pages.push(i);
      }
      return pages;
    },
    displayedRecipients() {
      if (this.showAllRecipients) {
        return this.emailRecipients;
      }
      return this.emailRecipients.slice(0, 3);
    }
  },
  watch: {
    filters: {
      handler(newFilters) {
        this.localFilters = { ...newFilters };
      },
      deep: true
    },
    showEmailComposer(isOpen) {
      if (isOpen) {
        (void 0).body.style.overflow = "hidden";
      } else {
        (void 0).body.style.overflow = "";
      }
    },
    showContactDetail(_isOpen) {
    },
    showSaveTemplate(_isOpen) {
    }
  },
  beforeUnmount() {
    (void 0).body.style.overflow = "";
  },
  methods: {
    // Recherche et filtres
    debounceSearch() {
      clearTimeout(this.searchTimeout);
      this.searchTimeout = setTimeout(() => {
        this.updateFilters();
      }, 300);
    },
    updateFilters() {
      this.$emit("update-filters", this.localFilters);
    },
    // Sélection des contacts
    isContactSelected(contact) {
      return this.selectedContacts.some((c) => c.id === contact.id);
    },
    toggleContact(contact) {
      this.$emit("select-contact", contact);
    },
    toggleSelectAll() {
      this.$emit("select-all");
    },
    clearSelection() {
      this.$emit("clear-selection");
    },
    // Actions sur les contacts
    updateContactStatus(contactId, newStatus) {
      this.$emit("update-status", contactId, newStatus);
    },
    bulkUpdateStatus(event) {
      const newStatus = event.target.value;
      if (newStatus && this.selectedContacts.length > 0) {
        this.selectedContacts.forEach((contact) => {
          this.$emit("update-status", contact.id, newStatus);
        });
        event.target.value = "";
      }
    },
    // Email
    openEmailComposer() {
      if (this.selectedContacts.length > 0) {
        this.emailRecipients = [...this.selectedContacts];
        this.showEmailComposer = true;
        this.resetEmailForm();
      }
    },
    composeEmailForContact(contact) {
      this.emailRecipients = [contact];
      this.showEmailComposer = true;
      this.resetEmailForm();
    },
    quickEmail() {
      this.openEmailComposer();
      this.selectedTemplate = "welcome";
      this.applyTemplate();
    },
    sendQuickEmail(contact) {
      this.composeEmailForContact(contact);
      this.selectedTemplate = "welcome";
      this.applyTemplate();
    },
    closeEmailComposer() {
      this.showEmailComposer = false;
      this.emailRecipients = [];
      this.resetEmailForm();
      this.showAllRecipients = false;
    },
    resetEmailForm() {
      this.emailData = {
        subject: "",
        message: ""
      };
      this.selectedTemplate = "";
    },
    applyTemplate() {
      if (this.selectedTemplate) {
        const template = this.emailTemplates.find((t) => t.id === this.selectedTemplate);
        if (template) {
          this.emailData.subject = template.subject;
          this.emailData.message = template.message;
        }
      }
    },
    async sendEmail() {
      try {
        this.sending = true;
        const emailPayload = {
          recipients: this.emailRecipients.map((c) => ({
            id: c.id,
            email: c.email,
            firstName: c.firstName
          })),
          subject: this.emailData.subject,
          message: this.emailData.message
        };
        this.$emit("send-email", emailPayload);
        this.closeEmailComposer();
      } catch (error) {
        console.error("Erreur envoi email:", error);
      } finally {
        this.sending = false;
      }
    },
    // Templates
    saveTemplate() {
      this.showSaveTemplate = true;
    },
    closeSaveTemplate() {
      this.showSaveTemplate = false;
    },
    handleTemplateSave(templateData) {
      this.emailTemplates.push({
        id: Date.now().toString(),
        name: templateData.name,
        subject: this.emailData.subject,
        message: this.emailData.message
      });
      this.closeSaveTemplate();
    },
    // Détails du contact
    openContactDetail(contact) {
      this.selectedContactForDetail = contact;
      this.showContactDetail = true;
    },
    closeContactDetail() {
      this.showContactDetail = false;
      this.selectedContactForDetail = null;
    },
    handleContactUpdate(updatedContact) {
      this.$emit("update-status", updatedContact.id, updatedContact.status);
    },
    // Pagination
    changePage(page) {
      if (page !== this.pagination.page) {
        this.$emit("load-contacts", { page });
      }
    },
    // Utilitaires
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString("fr-FR");
    },
    formatTime(dateString) {
      return new Date(dateString).toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit"
      });
    },
    getStatusClass(status) {
      const classes = {
        "Non trait\xE9": "status-pending",
        "Trait\xE9": "status-completed",
        "Relanc\xE9": "status-follow-up"
      };
      return classes[status] || "status-default";
    },
    getSourceClass(source) {
      const classes = {
        "Landing Page": "source-landing",
        "Facebook": "source-facebook",
        "Google": "source-google"
      };
      return classes[source] || "source-default";
    }
  }
};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_ContactDetailModal = resolveComponent("ContactDetailModal");
  const _component_SaveTemplateModal = resolveComponent("SaveTemplateModal");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "contacts-emails-section" }, _attrs))} data-v-7b789f1b><div class="main-toolbar" data-v-7b789f1b><div class="toolbar-content" data-v-7b789f1b><div class="search-filters" data-v-7b789f1b><div class="search-container" data-v-7b789f1b><input${ssrRenderAttr("value", $data.localFilters.search)} type="text" placeholder="Rechercher des contacts..." class="search-input" data-v-7b789f1b><div class="search-icon" data-v-7b789f1b><svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-7b789f1b><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" data-v-7b789f1b></path></svg></div></div><select class="filter-select" data-v-7b789f1b><option value="" data-v-7b789f1b${ssrIncludeBooleanAttr(Array.isArray($data.localFilters.status) ? ssrLooseContain($data.localFilters.status, "") : ssrLooseEqual($data.localFilters.status, "")) ? " selected" : ""}>Tous les statuts</option><option value="Non trait\xE9" data-v-7b789f1b${ssrIncludeBooleanAttr(Array.isArray($data.localFilters.status) ? ssrLooseContain($data.localFilters.status, "Non trait\xE9") : ssrLooseEqual($data.localFilters.status, "Non trait\xE9")) ? " selected" : ""}>Non trait\xE9</option><option value="Trait\xE9" data-v-7b789f1b${ssrIncludeBooleanAttr(Array.isArray($data.localFilters.status) ? ssrLooseContain($data.localFilters.status, "Trait\xE9") : ssrLooseEqual($data.localFilters.status, "Trait\xE9")) ? " selected" : ""}>Trait\xE9</option><option value="Relanc\xE9" data-v-7b789f1b${ssrIncludeBooleanAttr(Array.isArray($data.localFilters.status) ? ssrLooseContain($data.localFilters.status, "Relanc\xE9") : ssrLooseEqual($data.localFilters.status, "Relanc\xE9")) ? " selected" : ""}>Relanc\xE9</option></select><select class="filter-select" data-v-7b789f1b><option value="" data-v-7b789f1b${ssrIncludeBooleanAttr(Array.isArray($data.localFilters.source) ? ssrLooseContain($data.localFilters.source, "") : ssrLooseEqual($data.localFilters.source, "")) ? " selected" : ""}>Toutes les sources</option><option value="Landing Page" data-v-7b789f1b${ssrIncludeBooleanAttr(Array.isArray($data.localFilters.source) ? ssrLooseContain($data.localFilters.source, "Landing Page") : ssrLooseEqual($data.localFilters.source, "Landing Page")) ? " selected" : ""}>Landing Page</option><option value="Facebook" data-v-7b789f1b${ssrIncludeBooleanAttr(Array.isArray($data.localFilters.source) ? ssrLooseContain($data.localFilters.source, "Facebook") : ssrLooseEqual($data.localFilters.source, "Facebook")) ? " selected" : ""}>Facebook</option><option value="Google" data-v-7b789f1b${ssrIncludeBooleanAttr(Array.isArray($data.localFilters.source) ? ssrLooseContain($data.localFilters.source, "Google") : ssrLooseEqual($data.localFilters.source, "Google")) ? " selected" : ""}>Google</option></select></div><div class="main-actions" data-v-7b789f1b><button${ssrIncludeBooleanAttr($props.selectedContacts.length === 0) ? " disabled" : ""} class="${ssrRenderClass([{ "has-selection": $props.selectedContacts.length > 0 }, "compose-btn primary"])}" data-v-7b789f1b><svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-7b789f1b><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2v10a2 2 0 002 2z" data-v-7b789f1b></path></svg> ${ssrInterpolate($props.selectedContacts.length > 0 ? `Envoyer \xE0 ${$props.selectedContacts.length} contact(s)` : "S\xE9lectionnez des contacts")}</button>`);
  if ($props.selectedContacts.length > 0) {
    _push(`<div class="selection-actions" data-v-7b789f1b><select class="bulk-select" data-v-7b789f1b><option value="" data-v-7b789f1b>Changer le statut</option><option value="Non trait\xE9" data-v-7b789f1b>Non trait\xE9</option><option value="Trait\xE9" data-v-7b789f1b>Trait\xE9</option><option value="Relanc\xE9" data-v-7b789f1b>Relanc\xE9</option></select><button class="clear-btn" title="D\xE9s\xE9lectionner tout" data-v-7b789f1b><svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-7b789f1b><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-v-7b789f1b></path></svg></button></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div></div>`);
  if ($props.selectedContacts.length > 0) {
    _push(`<div class="selection-bar" data-v-7b789f1b><div class="selection-info" data-v-7b789f1b><span class="selection-count" data-v-7b789f1b>${ssrInterpolate($props.selectedContacts.length)} contact(s) s\xE9lectionn\xE9(s)</span><div class="selected-contacts-preview" data-v-7b789f1b><div class="preview-avatars" data-v-7b789f1b><!--[-->`);
    ssrRenderList($props.selectedContacts.slice(0, 3), (contact, index) => {
      _push(`<div class="contact-avatar" style="${ssrRenderStyle({ zIndex: 3 - index })}" data-v-7b789f1b>${ssrInterpolate(contact.firstName.charAt(0).toUpperCase())}</div>`);
    });
    _push(`<!--]-->`);
    if ($props.selectedContacts.length > 3) {
      _push(`<div class="more-count" data-v-7b789f1b> +${ssrInterpolate($props.selectedContacts.length - 3)}</div>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</div></div></div><div class="quick-actions" data-v-7b789f1b><button class="quick-action-btn primary" data-v-7b789f1b><svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-7b789f1b><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" data-v-7b789f1b></path></svg> Envoi rapide </button><button class="quick-action-btn" data-v-7b789f1b><svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-7b789f1b><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" data-v-7b789f1b></path></svg> Composer </button></div></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div><div class="contacts-table-container" data-v-7b789f1b>`);
  if ($props.loading) {
    _push(`<div class="loading-container" data-v-7b789f1b><div class="loading-spinner" data-v-7b789f1b><svg class="spinner" fill="none" viewBox="0 0 24 24" data-v-7b789f1b><circle class="spinner-circle" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" data-v-7b789f1b></circle><path class="spinner-path" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" data-v-7b789f1b></path></svg><p class="loading-text" data-v-7b789f1b>Chargement des contacts...</p></div></div>`);
  } else if ($props.contacts.length === 0) {
    _push(`<div class="empty-state" data-v-7b789f1b><div class="empty-icon" data-v-7b789f1b><svg fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-7b789f1b><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" data-v-7b789f1b></path></svg></div><h3 class="empty-title" data-v-7b789f1b>Aucun contact trouv\xE9</h3><p class="empty-description" data-v-7b789f1b>Aucun contact ne correspond \xE0 vos crit\xE8res de recherche.</p></div>`);
  } else {
    _push(`<div class="contacts-table" data-v-7b789f1b><div class="table-header" data-v-7b789f1b><div class="header-cell select-cell" data-v-7b789f1b><input type="checkbox"${ssrIncludeBooleanAttr($options.isAllSelected) ? " checked" : ""}${ssrRenderAttr("indeterminate", $options.isPartialSelected)} class="checkbox" data-v-7b789f1b></div><div class="header-cell name-cell" data-v-7b789f1b>Contact</div><div class="header-cell email-cell" data-v-7b789f1b>Email</div><div class="header-cell phone-cell" data-v-7b789f1b>T\xE9l\xE9phone</div><div class="header-cell status-cell" data-v-7b789f1b>Statut</div><div class="header-cell source-cell" data-v-7b789f1b>Source</div><div class="header-cell date-cell" data-v-7b789f1b>Date</div><div class="header-cell actions-cell" data-v-7b789f1b>Actions</div></div><div class="table-body" data-v-7b789f1b><!--[-->`);
    ssrRenderList($props.contacts, (contact) => {
      _push(`<div class="${ssrRenderClass([{
        "selected": $options.isContactSelected(contact),
        "hover": $data.hoveredContact === contact.id
      }, "contact-row"])}" data-v-7b789f1b><div class="row-cell select-cell" data-v-7b789f1b><input type="checkbox"${ssrIncludeBooleanAttr($options.isContactSelected(contact)) ? " checked" : ""} class="checkbox" data-v-7b789f1b></div><div class="row-cell name-cell" data-v-7b789f1b><div class="contact-info" data-v-7b789f1b><div class="contact-avatar" data-v-7b789f1b>${ssrInterpolate(contact.firstName.charAt(0).toUpperCase())}</div><div class="contact-details" data-v-7b789f1b><div class="contact-name" data-v-7b789f1b>${ssrInterpolate(contact.firstName)} ${ssrInterpolate(contact.lastName || "")}</div>`);
      if (contact.company) {
        _push(`<div class="contact-company" data-v-7b789f1b>${ssrInterpolate(contact.company)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div><div class="row-cell email-cell" data-v-7b789f1b><div class="email-content" data-v-7b789f1b><span class="email-address" data-v-7b789f1b>${ssrInterpolate(contact.email)}</span><button class="quick-email-btn" title="Envoi rapide" data-v-7b789f1b><svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-7b789f1b><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" data-v-7b789f1b></path></svg></button></div></div><div class="row-cell phone-cell" data-v-7b789f1b>${ssrInterpolate(contact.phone || "-")}</div><div class="row-cell status-cell" data-v-7b789f1b><select${ssrRenderAttr("value", contact.status)} class="${ssrRenderClass([$options.getStatusClass(contact.status), "status-select"])}" data-v-7b789f1b><option value="Non trait\xE9" data-v-7b789f1b>Non trait\xE9</option><option value="Trait\xE9" data-v-7b789f1b>Trait\xE9</option><option value="Relanc\xE9" data-v-7b789f1b>Relanc\xE9</option></select></div><div class="row-cell source-cell" data-v-7b789f1b><span class="${ssrRenderClass([$options.getSourceClass(contact.source), "source-badge"])}" data-v-7b789f1b>${ssrInterpolate(contact.source || "Inconnue")}</span></div><div class="row-cell date-cell" data-v-7b789f1b><div class="date-info" data-v-7b789f1b><div class="date-value" data-v-7b789f1b>${ssrInterpolate($options.formatDate(contact.createdAt))}</div><div class="date-time" data-v-7b789f1b>${ssrInterpolate($options.formatTime(contact.createdAt))}</div></div></div><div class="row-cell actions-cell" data-v-7b789f1b><div class="actions-menu" data-v-7b789f1b><button class="action-btn" title="Voir d\xE9tails" data-v-7b789f1b><svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-7b789f1b><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" data-v-7b789f1b></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" data-v-7b789f1b></path></svg></button><button class="action-btn" title="Envoyer email" data-v-7b789f1b><svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-7b789f1b><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" data-v-7b789f1b></path></svg></button></div></div></div>`);
    });
    _push(`<!--]--></div></div>`);
  }
  if ($props.contacts.length > 0) {
    _push(`<div class="pagination" data-v-7b789f1b><div class="pagination-info" data-v-7b789f1b> Affichage de ${ssrInterpolate(($props.pagination.page - 1) * $props.pagination.limit + 1)} \xE0 ${ssrInterpolate(Math.min($props.pagination.page * $props.pagination.limit, $props.pagination.total))} sur ${ssrInterpolate($props.pagination.total)} contacts </div><div class="pagination-controls" data-v-7b789f1b><button${ssrIncludeBooleanAttr(!$props.pagination.hasPrev) ? " disabled" : ""} class="pagination-btn" data-v-7b789f1b><svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-7b789f1b><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" data-v-7b789f1b></path></svg> Pr\xE9c\xE9dent </button><div class="page-numbers" data-v-7b789f1b><!--[-->`);
    ssrRenderList($options.visiblePages, (page) => {
      _push(`<button class="${ssrRenderClass([["page-btn", { active: page === $props.pagination.page }], "pagination-btn"])}" data-v-7b789f1b>${ssrInterpolate(page)}</button>`);
    });
    _push(`<!--]--></div><button${ssrIncludeBooleanAttr(!$props.pagination.hasNext) ? " disabled" : ""} class="pagination-btn" data-v-7b789f1b> Suivant <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-7b789f1b><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" data-v-7b789f1b></path></svg></button></div></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div>`);
  if ($data.showEmailComposer) {
    _push(`<div class="email-composer-modal" data-v-7b789f1b><div class="modal-backdrop" data-v-7b789f1b></div><div class="modal-content" data-v-7b789f1b><div class="modal-header" data-v-7b789f1b><h3 class="modal-title" data-v-7b789f1b> Composer un email `);
    if ($data.emailRecipients.length > 1) {
      _push(`<span class="recipients-count" data-v-7b789f1b> (${ssrInterpolate($data.emailRecipients.length)} destinataires) </span>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</h3><button class="close-btn" data-v-7b789f1b><svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-7b789f1b><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-v-7b789f1b></path></svg></button></div><div class="modal-body" data-v-7b789f1b><div class="recipients-section" data-v-7b789f1b><div class="recipients-header" data-v-7b789f1b><span class="section-label" data-v-7b789f1b>Destinataires</span>`);
    if ($data.emailRecipients.length > 3) {
      _push(`<button class="toggle-recipients-btn" data-v-7b789f1b>${ssrInterpolate($data.showAllRecipients ? "R\xE9duire" : `Voir tous (${$data.emailRecipients.length})`)}</button>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</div><div class="recipients-list" data-v-7b789f1b><!--[-->`);
    ssrRenderList($options.displayedRecipients, (contact) => {
      _push(`<div class="recipient-item" data-v-7b789f1b><div class="recipient-avatar" data-v-7b789f1b>${ssrInterpolate(contact.firstName.charAt(0).toUpperCase())}</div><div class="recipient-info" data-v-7b789f1b><div class="recipient-name" data-v-7b789f1b>${ssrInterpolate(contact.firstName)} ${ssrInterpolate(contact.lastName || "")}</div><div class="recipient-email" data-v-7b789f1b>${ssrInterpolate(contact.email)}</div></div></div>`);
    });
    _push(`<!--]--></div></div><form class="email-form" data-v-7b789f1b><div class="form-group" data-v-7b789f1b><label class="form-label" data-v-7b789f1b>Template (optionnel)</label><select class="form-select" data-v-7b789f1b><option value="" data-v-7b789f1b${ssrIncludeBooleanAttr(Array.isArray($data.selectedTemplate) ? ssrLooseContain($data.selectedTemplate, "") : ssrLooseEqual($data.selectedTemplate, "")) ? " selected" : ""}>S\xE9lectionner un template</option><!--[-->`);
    ssrRenderList($data.emailTemplates, (template) => {
      _push(`<option${ssrRenderAttr("value", template.id)} data-v-7b789f1b${ssrIncludeBooleanAttr(Array.isArray($data.selectedTemplate) ? ssrLooseContain($data.selectedTemplate, template.id) : ssrLooseEqual($data.selectedTemplate, template.id)) ? " selected" : ""}>${ssrInterpolate(template.name)}</option>`);
    });
    _push(`<!--]--></select></div><div class="form-group" data-v-7b789f1b><label class="form-label" data-v-7b789f1b> Sujet <span class="required" data-v-7b789f1b>*</span></label><input${ssrRenderAttr("value", $data.emailData.subject)} type="text" required placeholder="Sujet de l&#39;email" class="form-input" data-v-7b789f1b></div><div class="form-group" data-v-7b789f1b><label class="form-label" data-v-7b789f1b> Message <span class="required" data-v-7b789f1b>*</span></label><textarea required placeholder="Votre message..." rows="8" class="form-textarea" data-v-7b789f1b>${ssrInterpolate($data.emailData.message)}</textarea><div class="message-help" data-v-7b789f1b> Vous pouvez utiliser {firstName} pour personnaliser avec le pr\xE9nom. </div></div><div class="form-actions" data-v-7b789f1b><button type="button" class="save-template-btn"${ssrIncludeBooleanAttr(!$data.emailData.subject || !$data.emailData.message) ? " disabled" : ""} data-v-7b789f1b><svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-7b789f1b><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12" data-v-7b789f1b></path></svg> Sauvegarder comme template </button><div class="primary-actions" data-v-7b789f1b><button type="button" class="cancel-btn" data-v-7b789f1b> Annuler </button><button type="submit"${ssrIncludeBooleanAttr($data.sending || !$data.emailData.subject || !$data.emailData.message) ? " disabled" : ""} class="send-btn" data-v-7b789f1b>`);
    if ($data.sending) {
      _push(`<svg class="icon spinning" fill="none" viewBox="0 0 24 24" data-v-7b789f1b><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" data-v-7b789f1b></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" data-v-7b789f1b></path></svg>`);
    } else {
      _push(`<svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-7b789f1b><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" data-v-7b789f1b></path></svg>`);
    }
    _push(` ${ssrInterpolate($data.sending ? "Envoi..." : "Envoyer")}</button></div></div></form></div></div></div>`);
  } else {
    _push(`<!---->`);
  }
  if ($data.showContactDetail) {
    _push(ssrRenderComponent(_component_ContactDetailModal, {
      contact: $data.selectedContactForDetail,
      onClose: $options.closeContactDetail,
      onUpdate: $options.handleContactUpdate
    }, null, _parent));
  } else {
    _push(`<!---->`);
  }
  if ($data.showSaveTemplate) {
    _push(ssrRenderComponent(_component_SaveTemplateModal, {
      templateData: $data.emailData,
      onClose: $options.closeSaveTemplate,
      onSave: $options.handleTemplateSave
    }, null, _parent));
  } else {
    _push(`<!---->`);
  }
  _push(`</div>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/dashboard/ContactsEmailsSection.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const ContactsEmailsSection = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$2], ["__scopeId", "data-v-7b789f1b"]]);
const _sfc_main$1 = {
  name: "AnalyticsSection",
  props: {
    analytics: {
      type: Object,
      default: () => ({})
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    hasAnyData() {
      console.log("\u{1F4CA} Analytics data received:", this.analytics);
      const hasPageViews = this.analytics.pageViews && (this.analytics.pageViews.today > 0 || this.analytics.pageViews.week > 0 || this.analytics.pageViews.month > 0);
      const hasSources = this.analytics.sources && this.analytics.sources.length > 0 && this.analytics.sources.some((source) => source.count > 0);
      const hasDevices = this.analytics.devices && this.analytics.devices.length > 0 && this.analytics.devices.some((device) => device.count > 0);
      const result = hasPageViews || hasSources || hasDevices;
      console.log("\u{1F4CA} Has any data:", result, { hasPageViews, hasSources, hasDevices });
      return result;
    }
  },
  methods: {
    formatNumber(value) {
      if (value === null || value === void 0) return "0";
      return value.toLocaleString("fr-FR");
    },
    getSourceColorClass(index) {
      const colors = ["blue", "green", "purple", "yellow", "red", "indigo"];
      return colors[index % colors.length];
    },
    getDeviceColorClass(index) {
      const colors = ["emerald", "cyan", "pink"];
      return colors[index % colors.length];
    }
  }
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  var _a, _b, _c;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "analytics-section" }, _attrs))} data-v-51c177f0><div class="analytics-header" data-v-51c177f0><h2 class="section-title" data-v-51c177f0>Analytics &amp; Performance</h2><p class="section-description" data-v-51c177f0> Analysez votre trafic et les performances de votre site </p></div>`);
  if ($props.loading) {
    _push(`<div class="overview-card loading-card" data-v-51c177f0><div class="loading-spinner" data-v-51c177f0><svg class="spinner" fill="none" viewBox="0 0 24 24" data-v-51c177f0><circle class="spinner-circle" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" data-v-51c177f0></circle><path class="spinner-path" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" data-v-51c177f0></path></svg><p class="loading-text" data-v-51c177f0>Chargement des analytics...</p></div></div>`);
  } else if (!$options.hasAnyData) {
    _push(`<div class="overview-card empty-state" data-v-51c177f0><div class="empty-icon" data-v-51c177f0><svg fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-51c177f0><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" data-v-51c177f0></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" data-v-51c177f0></path></svg></div><h3 class="empty-title" data-v-51c177f0>Aucune donn\xE9e analytique</h3><p class="empty-description" data-v-51c177f0> Les donn\xE9es analytiques appara\xEEtront ici une fois que votre site recevra du trafic. Actuellement, aucune activit\xE9 n&#39;a \xE9t\xE9 d\xE9tect\xE9e dans vos statistiques. </p></div>`);
  } else {
    _push(`<div class="analytics-content" data-v-51c177f0><div class="metrics-grid" data-v-51c177f0><div class="metric-card" data-v-51c177f0><div class="metric-header" data-v-51c177f0><h3 class="metric-label" data-v-51c177f0>VUES AUJOURD&#39;HUI</h3><div class="metric-icon today" data-v-51c177f0><svg fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-51c177f0><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" data-v-51c177f0></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" data-v-51c177f0></path></svg></div></div><div class="metric-value" data-v-51c177f0>${ssrInterpolate($options.formatNumber(((_a = $props.analytics.pageViews) == null ? void 0 : _a.today) || 0))}</div></div><div class="metric-card" data-v-51c177f0><div class="metric-header" data-v-51c177f0><h3 class="metric-label" data-v-51c177f0>CETTE SEMAINE</h3><div class="metric-icon week" data-v-51c177f0><svg fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-51c177f0><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" data-v-51c177f0></path></svg></div></div><div class="metric-value" data-v-51c177f0>${ssrInterpolate($options.formatNumber(((_b = $props.analytics.pageViews) == null ? void 0 : _b.week) || 0))}</div></div><div class="metric-card" data-v-51c177f0><div class="metric-header" data-v-51c177f0><h3 class="metric-label" data-v-51c177f0>CE MOIS</h3><div class="metric-icon month" data-v-51c177f0><svg fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-51c177f0><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-v-51c177f0></path></svg></div></div><div class="metric-value" data-v-51c177f0>${ssrInterpolate($options.formatNumber(((_c = $props.analytics.pageViews) == null ? void 0 : _c.month) || 0))}</div></div></div><div class="analytics-charts-grid" data-v-51c177f0><div class="chart-card" data-v-51c177f0><h3 class="chart-title" data-v-51c177f0>SOURCES DE TRAFIC</h3><div class="chart-content" data-v-51c177f0>`);
    if (!$props.analytics.sources || $props.analytics.sources.every((s) => s.count === 0)) {
      _push(`<div class="chart-empty" data-v-51c177f0><p class="chart-empty-text" data-v-51c177f0>Aucune donn\xE9e de source disponible</p></div>`);
    } else {
      _push(`<div class="chart-list" data-v-51c177f0><!--[-->`);
      ssrRenderList(($props.analytics.sources || []).filter((s) => s.count > 0), (source, index) => {
        _push(`<div class="chart-item" data-v-51c177f0><div class="chart-item-content" data-v-51c177f0><div class="chart-item-info" data-v-51c177f0><span class="chart-item-label" data-v-51c177f0>${ssrInterpolate(source.name.toUpperCase())}</span><span class="chart-item-value" data-v-51c177f0>${ssrInterpolate(source.count)}</span></div><div class="chart-progress-bar" data-v-51c177f0><div class="${ssrRenderClass(`chart-progress-fill ${$options.getSourceColorClass(index)}`)}" style="${ssrRenderStyle({ width: `${source.percentage}%` })}" data-v-51c177f0></div></div></div></div>`);
      });
      _push(`<!--]--></div>`);
    }
    _push(`</div></div><div class="chart-card" data-v-51c177f0><h3 class="chart-title" data-v-51c177f0>APPAREILS UTILIS\xC9S</h3><div class="chart-content" data-v-51c177f0>`);
    if (!$props.analytics.devices || $props.analytics.devices.every((d) => d.count === 0)) {
      _push(`<div class="chart-empty" data-v-51c177f0><p class="chart-empty-text" data-v-51c177f0>Aucune donn\xE9e d&#39;appareil disponible</p></div>`);
    } else {
      _push(`<div class="chart-list" data-v-51c177f0><!--[-->`);
      ssrRenderList(($props.analytics.devices || []).filter((d) => d.count > 0), (device, index) => {
        _push(`<div class="chart-item" data-v-51c177f0><div class="chart-item-content" data-v-51c177f0><div class="chart-item-info" data-v-51c177f0><span class="chart-item-label" data-v-51c177f0>${ssrInterpolate(device.name.toUpperCase())}</span><span class="chart-item-value" data-v-51c177f0>${ssrInterpolate(device.count)}</span></div><div class="chart-progress-bar" data-v-51c177f0><div class="${ssrRenderClass(`chart-progress-fill ${$options.getDeviceColorClass(index)}`)}" style="${ssrRenderStyle({ width: `${device.percentage}%` })}" data-v-51c177f0></div></div></div></div>`);
      });
      _push(`<!--]--></div>`);
    }
    _push(`</div></div></div></div>`);
  }
  _push(`</div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/dashboard/AnalyticsSection.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const AnalyticsSection = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-51c177f0"]]);
const _sfc_main = {
  name: "Dashboard",
  components: {
    StatsSection,
    ContactsEmailsSection,
    AnalyticsSection
  },
  data() {
    return {
      activeTab: "overview",
      // Commencer par la vue d'ensemble
      loading: false,
      error: null,
      // Données nettoyées
      stats: {
        totalContacts: 0,
        todayContacts: 0,
        weekContacts: 0,
        monthContacts: 0,
        conversionRate: 0,
        uniqueVisitors: 0,
        avgSessionDuration: 0,
        byStatus: [],
        topSources: [],
        emailCampaigns: 0
      },
      contacts: [],
      // Sera rempli par les vraies données
      analytics: {
        pageViews: { today: 0, week: 0, month: 0 },
        sources: [],
        devices: []
      },
      pagination: {
        page: 1,
        limit: 20,
        total: 0,
        pages: 1,
        hasNext: false,
        hasPrev: false
      },
      filters: {
        search: "",
        status: "",
        source: ""
      },
      // Selection
      selectedContacts: [],
      // Tabs reorganisés et simplifiés
      tabs: [
        { id: "overview", name: "Vue d'ensemble", icon: "HomeIcon", badge: null },
        { id: "contacts", name: "Contacts & Emails", icon: "UsersMailIcon", badge: 0 },
        { id: "analytics", name: "Analytics", icon: "ChartPieIcon", badge: null }
      ],
      seeding: false,
      exportFormat: "csv"
    };
  },
  computed: {
    isAllSelected() {
      return this.contacts.length > 0 && this.selectedContacts.length === this.contacts.length;
    },
    isPartialSelected() {
      return this.selectedContacts.length > 0 && this.selectedContacts.length < this.contacts.length;
    }
  },
  async mounted() {
    console.log("\u2705 Dashboard mont\xE9");
    try {
      const authStore = useAuthStore();
      if (!authStore.isInitialized) {
        console.log("\u{1F510} Initialisation de l'authentification...");
        const isAuthenticated = await authStore.initAuth();
        if (!isAuthenticated) {
          console.log("\u274C Non authentifi\xE9 - Redirection vers login");
          await navigateTo("/login");
          return;
        }
      } else if (!authStore.isLoggedIn) {
        console.log("\u274C Session expir\xE9e - Redirection vers login");
        await navigateTo("/login");
        return;
      }
      console.log("\u2705 Authentification valid\xE9e, chargement des donn\xE9es...");
      await this.loadDashboardData();
    } catch (error) {
      console.error("\u274C Erreur authentification dashboard:", error);
      await navigateTo("/login");
    }
  },
  methods: {
    async loadDashboardData() {
      try {
        this.loading = true;
        this.error = null;
        await Promise.all([
          this.loadStats(),
          this.loadContacts(),
          this.loadAnalytics()
        ]);
      } catch (error) {
        console.error("\u274C Erreur chargement dashboard:", error);
        this.error = "Erreur lors du chargement des donn\xE9es";
      } finally {
        this.loading = false;
      }
    },
    async loadStats() {
      try {
        const authStore = useAuthStore();
        const response = await $fetch("/api/dashboard/stats", {
          headers: {
            "Authorization": `Bearer ${authStore.token}`
          }
        });
        if (response.success) {
          this.stats = response.data;
        }
      } catch (error) {
        console.error("\u274C Erreur chargement stats:", error);
        if (error.statusCode === 401) {
          console.log("\u{1F512} Token expir\xE9, redirection vers login");
          await navigateTo("/login");
        }
      }
    },
    async loadContacts(options = {}) {
      try {
        const authStore = useAuthStore();
        if (options.page) {
          this.pagination.page = options.page;
        }
        const requestQuery = {
          ...this.filters,
          page: this.pagination.page,
          limit: this.pagination.limit
        };
        const response = await $fetch("/api/dashboard/contacts", {
          query: requestQuery,
          headers: {
            "Authorization": `Bearer ${authStore.token}`
          }
        });
        if (response.success) {
          this.contacts = response.data.contacts;
          this.pagination = {
            ...response.data.pagination,
            pages: response.data.pagination.totalPages
            // Mapper totalPages vers pages pour le composant
          };
          this.tabs.find((t) => t.id === "contacts").badge = this.contacts.length;
        }
      } catch (error) {
        console.error("\u274C Erreur chargement contacts:", error);
        if (error.statusCode === 401) {
          await navigateTo("/login");
        }
      }
    },
    async loadAnalytics() {
      try {
        const authStore = useAuthStore();
        const response = await $fetch("/api/dashboard/analytics", {
          headers: {
            "Authorization": `Bearer ${authStore.token}`
          }
        });
        if (response.success) {
          this.analytics = response.data;
        }
      } catch (error) {
        console.error("\u274C Erreur chargement analytics:", error);
        if (error.statusCode === 401) {
          console.log("\u{1F512} Token expir\xE9, redirection vers login");
          await navigateTo("/login");
        }
        if (error.statusCode === 404) {
          console.log("\u{1F4CA} API Analytics pas encore impl\xE9ment\xE9e");
        }
      }
    },
    changeTab(tabId) {
      this.activeTab = tabId;
    },
    async refreshAll() {
      await this.loadDashboardData();
    },
    updateFilters(newFilters) {
      this.filters = { ...this.filters, ...newFilters };
      this.pagination.page = 1;
      this.loadContacts();
    },
    toggleContactSelection(contact) {
      const index = this.selectedContacts.findIndex((c) => c.id === contact.id);
      if (index > -1) {
        this.selectedContacts.splice(index, 1);
      } else {
        this.selectedContacts.push(contact);
      }
    },
    toggleSelectAll() {
      if (this.isAllSelected) {
        this.selectedContacts = [];
      } else {
        this.selectedContacts = [...this.contacts];
      }
    },
    async updateContactStatus(contactId, newStatus) {
      try {
        const authStore = useAuthStore();
        const response = await $fetch(`/api/dashboard/contacts/${contactId}`, {
          method: "PATCH",
          body: { status: newStatus },
          headers: {
            "Authorization": `Bearer ${authStore.token}`
          }
        });
        if (response.success) {
          const contact = this.contacts.find((c) => c.id === contactId);
          if (contact) {
            contact.status = newStatus;
          }
        }
      } catch (error) {
        console.error("\u274C Erreur mise \xE0 jour statut:", error);
        if (error.statusCode === 401) {
          console.log("\u{1F512} Token expir\xE9, redirection vers login");
          await navigateTo("/login");
        }
      }
    },
    clearAllSelection() {
      this.selectedContacts = [];
    },
    // Actions rapides depuis la vue d'ensemble
    goToContactsWithEmail() {
      this.changeTab("contacts");
      setTimeout(() => {
        if (this.contacts.length > 0) {
          this.selectedContacts = [...this.contacts];
        }
      }, 100);
    },
    quickComposeEmail() {
      this.changeTab("contacts");
    },
    selectAllContacts() {
      this.selectedContacts = [...this.contacts];
      this.changeTab("contacts");
    },
    async downloadData() {
      if (this.contacts.length === 0) {
        alert("Aucune donn\xE9e \xE0 exporter");
        return;
      }
      const XLSX = await import('../_/xlsx.mjs').then(function (n) { return n.x; });
      const headers = ["Pr\xE9nom", "Email", "T\xE9l\xE9phone", "Statut", "Source", "Date de cr\xE9ation"];
      const data = [
        headers,
        ...this.contacts.map((contact) => [
          contact.firstName || "",
          contact.email || "",
          contact.phone || "",
          contact.status || "",
          contact.source || "",
          contact.createdAt ? new Date(contact.createdAt).toLocaleDateString("fr-FR") : ""
        ])
      ];
      const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
      const baseFilename = `yaalstudio-contacts-${today}`;
      if (this.exportFormat === "xlsx") {
        const ws = XLSX.utils.aoa_to_sheet(data);
        const range = XLSX.utils.decode_range(ws["!ref"]);
        for (let col = range.s.c; col <= range.e.c; col++) {
          const cellAddress = XLSX.utils.encode_cell({ r: 0, c: col });
          if (!ws[cellAddress]) continue;
          ws[cellAddress].s = {
            font: { bold: true },
            fill: { fgColor: { rgb: "CCCCCC" } }
          };
        }
        ws["!cols"] = [
          { wch: 20 },
          // Prénom
          { wch: 25 },
          // Email
          { wch: 15 },
          // Téléphone
          { wch: 12 },
          // Statut
          { wch: 15 },
          // Source
          { wch: 18 }
          // Date de création
        ];
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Contacts");
        wb.Props = {
          Title: "Contacts YaalStudio",
          Subject: "Liste des contacts",
          Author: "YaalStudio Dashboard",
          CreatedDate: /* @__PURE__ */ new Date()
        };
        XLSX.writeFile(wb, `${baseFilename}.xlsx`);
      } else {
        const csvContent = data.map(
          (row) => row.map((field) => `"${String(field).replace(/"/g, '""')}"`).join(",")
        ).join("\n");
        const bom = "\uFEFF";
        const blob = new Blob([bom + csvContent], { type: "text/csv;charset=utf-8;" });
        const link = (void 0).createElement("a");
        if (link.download !== void 0) {
          const url = URL.createObjectURL(blob);
          link.setAttribute("href", url);
          link.setAttribute("download", `${baseFilename}.csv`);
          link.style.visibility = "hidden";
          (void 0).body.appendChild(link);
          link.click();
          (void 0).body.removeChild(link);
          URL.revokeObjectURL(url);
        }
      }
    },
    formatTimeAgo(date) {
      const now = /* @__PURE__ */ new Date();
      const diffInSeconds = Math.floor((now - date) / 1e3);
      if (diffInSeconds < 60) return "Il y a quelques secondes";
      if (diffInSeconds < 3600) return `Il y a ${Math.floor(diffInSeconds / 60)} minutes`;
      if (diffInSeconds < 86400) return `Il y a ${Math.floor(diffInSeconds / 3600)} heures`;
      return `Il y a ${Math.floor(diffInSeconds / 86400)} jours`;
    },
    async sendMassEmail(emailData) {
      try {
        this.loading = true;
        const authStore = useAuthStore();
        const response = await $fetch("/api/dashboard/emails/send-mass", {
          method: "POST",
          body: emailData,
          headers: {
            "Authorization": `Bearer ${authStore.token}`
          }
        });
        if (response.success) {
          alert("Emails envoy\xE9s avec succ\xE8s !");
          this.selectedContacts = [];
        }
      } catch (error) {
        console.error("\u274C Erreur envoi emails:", error);
        if (error.statusCode === 401) {
          console.log("\u{1F512} Token expir\xE9, redirection vers login");
          await navigateTo("/login");
        } else {
          alert("Erreur lors de l'envoi des emails");
        }
      } finally {
        this.loading = false;
      }
    },
    async handleLogout() {
      try {
        this.loading = true;
        const authStore = useAuthStore();
        await authStore.logout();
        await navigateTo("/login", { replace: true });
        setTimeout(() => {
          (void 0).location.href = "/login";
        }, 100);
      } catch (error) {
        console.error("\u274C Erreur lors de la d\xE9connexion:", error);
        (void 0).location.href = "/login";
      } finally {
        this.loading = false;
      }
    },
    async seedContacts() {
      try {
        this.seeding = true;
        const authStore = useAuthStore();
        const response = await $fetch("/api/seed-contacts", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${authStore.token}`
          }
        });
        if (response.success) {
          alert(`\u2705 ${response.message}`);
          await this.loadContacts();
        } else {
          alert("Erreur lors de la cr\xE9ation des contacts de test.");
        }
      } catch (error) {
        console.error("\u274C Erreur seeding contacts:", error);
        if (error.statusCode === 401) {
          console.log("\u{1F512} Token expir\xE9, redirection vers login");
          await navigateTo("/login");
        } else {
          alert("Erreur lors de la cr\xE9ation des contacts de test.");
        }
      } finally {
        this.seeding = false;
      }
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_StatsSection = resolveComponent("StatsSection");
  const _component_ContactsEmailsSection = resolveComponent("ContactsEmailsSection");
  const _component_AnalyticsSection = resolveComponent("AnalyticsSection");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "dashboard-page" }, _attrs))} data-v-c9cf0808><div class="twinkling-dots" data-v-c9cf0808><div class="dot dot-1" data-v-c9cf0808></div><div class="dot dot-2" data-v-c9cf0808></div><div class="dot dot-3" data-v-c9cf0808></div><div class="dot dot-4" data-v-c9cf0808></div><div class="dot dot-5" data-v-c9cf0808></div></div><div class="dashboard-content" data-v-c9cf0808><header class="dashboard-header" data-v-c9cf0808><div class="container" data-v-c9cf0808><div class="header-content" data-v-c9cf0808><div class="header-main" data-v-c9cf0808><div class="header-branding" data-v-c9cf0808><h1 class="dashboard-title blinka-serif" data-v-c9cf0808>YaalStudio</h1><span class="dashboard-subtitle" data-v-c9cf0808>Dashboard</span></div><div class="header-stats" data-v-c9cf0808><div class="stat-card" data-v-c9cf0808><div class="stat-content" data-v-c9cf0808><span class="stat-number" data-v-c9cf0808>${ssrInterpolate($data.stats.totalContacts || 0)}</span><span class="stat-label" data-v-c9cf0808>Contacts Total</span></div></div><div class="stat-divider" data-v-c9cf0808></div><div class="stat-card" data-v-c9cf0808><div class="stat-content" data-v-c9cf0808><span class="stat-number" data-v-c9cf0808>${ssrInterpolate($data.stats.todayContacts || 0)}</span><span class="stat-label" data-v-c9cf0808>Aujourd&#39;hui</span></div></div><div class="stat-divider" data-v-c9cf0808></div><div class="stat-card" data-v-c9cf0808><div class="stat-content" data-v-c9cf0808><span class="stat-number" data-v-c9cf0808>${ssrInterpolate($data.selectedContacts.length)}</span><span class="stat-label" data-v-c9cf0808>S\xE9lectionn\xE9s</span></div></div></div></div><div class="header-actions" data-v-c9cf0808><div class="actions-group" data-v-c9cf0808><button${ssrIncludeBooleanAttr($data.loading) ? " disabled" : ""} class="${ssrRenderClass([{ "loading": $data.loading }, "action-button refresh-btn"])}" title="Actualiser les donn\xE9es" data-v-c9cf0808>`);
  if (!$data.loading) {
    _push(`<svg class="action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-c9cf0808><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" data-v-c9cf0808></path></svg>`);
  } else {
    _push(`<svg class="action-icon spinning" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-c9cf0808><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" data-v-c9cf0808></path></svg>`);
  }
  _push(`</button>`);
  if ($data.selectedContacts.length > 0) {
    _push(`<div class="selection-indicator" data-v-c9cf0808><div class="selection-badge" data-v-c9cf0808><svg class="selection-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-c9cf0808><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" data-v-c9cf0808></path></svg> ${ssrInterpolate($data.selectedContacts.length)}</div><button class="quick-compose-btn" title="Composition rapide" data-v-c9cf0808><svg class="action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-c9cf0808><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" data-v-c9cf0808></path></svg></button></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<div class="user-profile" data-v-c9cf0808><div class="user-avatar" data-v-c9cf0808><div class="avatar-indicator" data-v-c9cf0808></div><span class="avatar-text" data-v-c9cf0808>YS</span></div><div class="user-details" data-v-c9cf0808><span class="user-name" data-v-c9cf0808>Admin</span><span class="user-role" data-v-c9cf0808>YaalStudio</span></div></div><button${ssrIncludeBooleanAttr($data.loading) ? " disabled" : ""} class="${ssrRenderClass([{ "loading": $data.loading }, "logout-btn"])}" title="Se d\xE9connecter" data-v-c9cf0808>`);
  if (!$data.loading) {
    _push(`<svg class="logout-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-c9cf0808><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" data-v-c9cf0808></path></svg>`);
  } else {
    _push(`<svg class="logout-icon spinning" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-c9cf0808><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" data-v-c9cf0808></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" data-v-c9cf0808></path></svg>`);
  }
  _push(`<span class="logout-text" data-v-c9cf0808>${ssrInterpolate($data.loading ? "D\xE9connexion..." : "D\xE9connexion")}</span></button></div></div></div></div></header><div class="dashboard-nav" data-v-c9cf0808><div class="container" data-v-c9cf0808><nav class="nav-tabs" data-v-c9cf0808><!--[-->`);
  ssrRenderList($data.tabs, (tab) => {
    _push(`<button class="${ssrRenderClass([
      "nav-tab",
      { "active": $data.activeTab === tab.id }
    ])}" data-v-c9cf0808><span class="tab-content" data-v-c9cf0808>`);
    if (tab.icon === "HomeIcon") {
      _push(`<svg class="tab-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-c9cf0808><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" data-v-c9cf0808></path></svg>`);
    } else if (tab.icon === "UsersMailIcon") {
      _push(`<svg class="tab-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-c9cf0808><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" data-v-c9cf0808></path></svg>`);
    } else if (tab.icon === "ChartPieIcon") {
      _push(`<svg class="tab-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-c9cf0808><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" data-v-c9cf0808></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" data-v-c9cf0808></path></svg>`);
    } else {
      _push(`<!---->`);
    }
    _push(`<span class="tab-label" data-v-c9cf0808>${ssrInterpolate(tab.name)}</span>`);
    if (tab.badge) {
      _push(`<span class="tab-badge" data-v-c9cf0808>${ssrInterpolate(tab.badge)}</span>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</span></button>`);
  });
  _push(`<!--]--></nav></div></div><main class="dashboard-main" data-v-c9cf0808><div class="container" data-v-c9cf0808>`);
  if ($data.error) {
    _push(`<div class="error-message" data-v-c9cf0808>${ssrInterpolate($data.error)}</div>`);
  } else {
    _push(`<!---->`);
  }
  if ($data.activeTab === "overview") {
    _push(`<div class="tab-content" data-v-c9cf0808><div class="overview-section" data-v-c9cf0808><div class="overview-header" data-v-c9cf0808><h2 class="section-title" data-v-c9cf0808>VUE D&#39;ENSEMBLE</h2><p class="section-description" data-v-c9cf0808> Aper\xE7u complet de vos performances et activit\xE9s r\xE9centes </p></div><div class="overview-main-stats" data-v-c9cf0808>`);
    _push(ssrRenderComponent(_component_StatsSection, {
      stats: $data.stats,
      loading: $data.loading
    }, null, _parent));
    _push(`</div><div class="overview-content-grid" data-v-c9cf0808><div class="overview-column left-column" data-v-c9cf0808><div class="overview-card quick-actions-card" data-v-c9cf0808><h3 class="card-title" data-v-c9cf0808>ACTIONS RAPIDES</h3><div class="quick-actions-grid" data-v-c9cf0808><div class="quick-action-card contacts" data-v-c9cf0808><div class="metric-header" data-v-c9cf0808><h4 class="metric-label" data-v-c9cf0808>CONTACTS</h4><div class="metric-icon contacts" data-v-c9cf0808><svg fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-c9cf0808><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" data-v-c9cf0808></path></svg></div></div><div class="metric-value" data-v-c9cf0808>${ssrInterpolate($data.stats.totalContacts || 0)}</div><button class="metric-action" data-v-c9cf0808>Voir les contacts</button></div><div class="${ssrRenderClass([{ "disabled": $data.contacts.length === 0 }, "quick-action-card emails"])}" data-v-c9cf0808><div class="metric-header" data-v-c9cf0808><h4 class="metric-label" data-v-c9cf0808>EMAILS</h4><div class="metric-icon emails" data-v-c9cf0808><svg fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-c9cf0808><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" data-v-c9cf0808></path></svg></div></div><div class="metric-value" data-v-c9cf0808>${ssrInterpolate($data.selectedContacts.length)}</div><button class="metric-action"${ssrIncludeBooleanAttr($data.contacts.length === 0) ? " disabled" : ""} data-v-c9cf0808> Envoyer emails </button></div><div class="quick-action-card analytics" data-v-c9cf0808><div class="metric-header" data-v-c9cf0808><h4 class="metric-label" data-v-c9cf0808>ANALYTICS</h4><div class="metric-icon analytics" data-v-c9cf0808><svg fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-c9cf0808><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-v-c9cf0808></path></svg></div></div><div class="metric-value" data-v-c9cf0808>${ssrInterpolate($data.stats.conversionRate || 0)}%</div><button class="metric-action" data-v-c9cf0808>Voir analytics</button></div><div class="${ssrRenderClass([{ "loading": $data.loading }, "quick-action-card refresh"])}" data-v-c9cf0808><div class="metric-header" data-v-c9cf0808><h4 class="metric-label" data-v-c9cf0808>ACTUALISER</h4><div class="metric-icon refresh" data-v-c9cf0808><svg class="${ssrRenderClass({ "spinning": $data.loading })}" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-c9cf0808><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" data-v-c9cf0808></path></svg></div></div><div class="metric-value" data-v-c9cf0808>${ssrInterpolate($data.loading ? "..." : "OK")}</div><button class="metric-action"${ssrIncludeBooleanAttr($data.loading) ? " disabled" : ""} data-v-c9cf0808>Actualiser</button></div></div></div><div class="overview-card shortcuts-card" data-v-c9cf0808><h3 class="card-title" data-v-c9cf0808>RACCOURCIS AVANC\xC9S</h3><div class="shortcuts-list" data-v-c9cf0808>`);
    if ($data.contacts.length > 0) {
      _push(`<div class="${ssrRenderClass([{ "disabled": $data.contacts.length === 0 }, "shortcut-item"])}" data-v-c9cf0808><div class="shortcut-icon" data-v-c9cf0808><svg fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-c9cf0808><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" data-v-c9cf0808></path></svg></div><div class="shortcut-content" data-v-c9cf0808><div class="shortcut-label" data-v-c9cf0808>S\xC9LECTIONNER TOUS</div><div class="shortcut-description" data-v-c9cf0808>S\xE9lectionner tous les contacts pour envoi</div></div><button${ssrIncludeBooleanAttr($data.contacts.length === 0) ? " disabled" : ""} class="shortcut-action" data-v-c9cf0808> S\xE9lectionner </button></div>`);
    } else {
      _push(`<!---->`);
    }
    _push(`<div class="shortcut-item export-item" data-v-c9cf0808><div class="shortcut-icon" data-v-c9cf0808><svg fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-c9cf0808><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-c9cf0808></path></svg></div><div class="shortcut-content" data-v-c9cf0808><div class="shortcut-label" data-v-c9cf0808>EXPORTER DONN\xC9ES</div><div class="shortcut-description" data-v-c9cf0808>T\xE9l\xE9charger en CSV ou Excel</div></div><div class="export-controls" data-v-c9cf0808><select class="export-format-select" data-v-c9cf0808><option value="csv" data-v-c9cf0808${ssrIncludeBooleanAttr(Array.isArray($data.exportFormat) ? ssrLooseContain($data.exportFormat, "csv") : ssrLooseEqual($data.exportFormat, "csv")) ? " selected" : ""}>CSV</option><option value="xlsx" data-v-c9cf0808${ssrIncludeBooleanAttr(Array.isArray($data.exportFormat) ? ssrLooseContain($data.exportFormat, "xlsx") : ssrLooseEqual($data.exportFormat, "xlsx")) ? " selected" : ""}>Excel</option></select><button class="shortcut-action"${ssrIncludeBooleanAttr($data.contacts.length === 0) ? " disabled" : ""} data-v-c9cf0808> Exporter </button></div></div></div></div></div><div class="overview-column right-column" data-v-c9cf0808><div class="overview-card activity-card" data-v-c9cf0808><h3 class="card-title" data-v-c9cf0808>ACTIVIT\xC9 R\xC9CENTE</h3><div class="activity-list" data-v-c9cf0808><div class="activity-item" data-v-c9cf0808><div class="activity-item-info" data-v-c9cf0808><div class="activity-label" data-v-c9cf0808>NOUVEAUX CONTACTS AUJOURD&#39;HUI</div><div class="activity-value" data-v-c9cf0808>${ssrInterpolate($data.stats.todayContacts || 0)}</div></div><div class="activity-progress-bar" data-v-c9cf0808><div class="activity-progress-fill new" style="${ssrRenderStyle({ width: $data.stats.todayContacts > 0 ? "100%" : "10%" })}" data-v-c9cf0808></div></div></div><div class="activity-item" data-v-c9cf0808><div class="activity-item-info" data-v-c9cf0808><div class="activity-label" data-v-c9cf0808>CONTACTS CETTE SEMAINE</div><div class="activity-value" data-v-c9cf0808>${ssrInterpolate($data.stats.weekContacts || 0)}</div></div><div class="activity-progress-bar" data-v-c9cf0808><div class="activity-progress-fill week" style="${ssrRenderStyle({ width: `${Math.min($data.stats.weekContacts / Math.max($data.stats.totalContacts, 1) * 100, 100)}%` })}" data-v-c9cf0808></div></div></div>`);
    if ($data.selectedContacts.length > 0) {
      _push(`<div class="activity-item" data-v-c9cf0808><div class="activity-item-info" data-v-c9cf0808><div class="activity-label" data-v-c9cf0808>CONTACTS S\xC9LECTIONN\xC9S</div><div class="activity-value" data-v-c9cf0808>${ssrInterpolate($data.selectedContacts.length)}</div></div><div class="activity-progress-bar" data-v-c9cf0808><div class="activity-progress-fill selection" style="${ssrRenderStyle({ width: `${Math.min($data.selectedContacts.length / Math.max($data.stats.totalContacts, 1) * 100, 100)}%` })}" data-v-c9cf0808></div></div></div>`);
    } else {
      _push(`<!---->`);
    }
    if ($data.stats.emailCampaigns > 0) {
      _push(`<div class="activity-item" data-v-c9cf0808><div class="activity-item-info" data-v-c9cf0808><div class="activity-label" data-v-c9cf0808>CAMPAGNES EMAIL</div><div class="activity-value" data-v-c9cf0808>${ssrInterpolate($data.stats.emailCampaigns)}</div></div><div class="activity-progress-bar" data-v-c9cf0808><div class="activity-progress-fill email" style="${ssrRenderStyle({ "width": "85%" })}" data-v-c9cf0808></div></div></div>`);
    } else {
      _push(`<!---->`);
    }
    _push(`<div class="activity-item" data-v-c9cf0808><div class="activity-item-info" data-v-c9cf0808><div class="activity-label" data-v-c9cf0808>TAUX DE CONVERSION</div><div class="activity-value" data-v-c9cf0808>${ssrInterpolate($data.stats.conversionRate || 0)}%</div></div><div class="activity-progress-bar" data-v-c9cf0808><div class="activity-progress-fill conversion" style="${ssrRenderStyle({ width: `${Math.min($data.stats.conversionRate || 0, 100)}%` })}" data-v-c9cf0808></div></div></div></div></div><div class="overview-card tips-card" data-v-c9cf0808><h3 class="card-title" data-v-c9cf0808>CONSEILS &amp; ASTUCES</h3><div class="tips-list" data-v-c9cf0808><div class="tip-item" data-v-c9cf0808><div class="tip-item-info" data-v-c9cf0808><div class="tip-label" data-v-c9cf0808>PERSONNALISATION</div><div class="tip-description" data-v-c9cf0808>Utilisez ${ssrInterpolate("{firstName}")} dans vos messages</div></div><div class="tip-progress-bar" data-v-c9cf0808><div class="tip-progress-fill" style="${ssrRenderStyle({ "width": "90%" })}" data-v-c9cf0808></div></div></div><div class="tip-item" data-v-c9cf0808><div class="tip-item-info" data-v-c9cf0808><div class="tip-label" data-v-c9cf0808>ENVOI RAPIDE</div><div class="tip-description" data-v-c9cf0808>Cliquez sur l&#39;ic\xF4ne email pour envoi instantan\xE9</div></div><div class="tip-progress-bar" data-v-c9cf0808><div class="tip-progress-fill" style="${ssrRenderStyle({ "width": "80%" })}" data-v-c9cf0808></div></div></div><div class="tip-item" data-v-c9cf0808><div class="tip-item-info" data-v-c9cf0808><div class="tip-label" data-v-c9cf0808>ANALYTICS</div><div class="tip-description" data-v-c9cf0808>Consultez l&#39;onglet pour insights d\xE9taill\xE9s</div></div><div class="tip-progress-bar" data-v-c9cf0808><div class="tip-progress-fill" style="${ssrRenderStyle({ "width": "95%" })}" data-v-c9cf0808></div></div></div></div></div></div></div></div></div>`);
  } else {
    _push(`<!---->`);
  }
  if ($data.activeTab === "contacts") {
    _push(`<div class="tab-content" data-v-c9cf0808>`);
    if ($data.contacts.length === 0 && !$data.loading) {
      _push(`<div class="seed-section" data-v-c9cf0808><div class="seed-card" data-v-c9cf0808><div class="seed-content" data-v-c9cf0808><div class="seed-icon" data-v-c9cf0808><svg fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-c9cf0808><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" data-v-c9cf0808></path></svg></div><h3 class="seed-title" data-v-c9cf0808>Aucun contact trouv\xE9</h3><p class="seed-description" data-v-c9cf0808> Votre base de donn\xE9es est vide. Vous pouvez cr\xE9er des contacts de test pour explorer les fonctionnalit\xE9s. </p><button${ssrIncludeBooleanAttr($data.seeding) ? " disabled" : ""} class="seed-btn" data-v-c9cf0808>`);
      if ($data.seeding) {
        _push(`<svg class="seed-spinner" fill="none" viewBox="0 0 24 24" data-v-c9cf0808><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" data-v-c9cf0808></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" data-v-c9cf0808></path></svg>`);
      } else {
        _push(`<svg class="seed-icon-btn" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-c9cf0808><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-v-c9cf0808></path></svg>`);
      }
      _push(` ${ssrInterpolate($data.seeding ? "Cr\xE9ation en cours..." : "Cr\xE9er des contacts de test")}</button></div></div></div>`);
    } else {
      _push(`<!---->`);
    }
    _push(ssrRenderComponent(_component_ContactsEmailsSection, {
      contacts: $data.contacts,
      loading: $data.loading,
      pagination: $data.pagination,
      filters: $data.filters,
      selectedContacts: $data.selectedContacts,
      onUpdateFilters: $options.updateFilters,
      onLoadContacts: $options.loadContacts,
      onSelectContact: $options.toggleContactSelection,
      onSelectAll: $options.toggleSelectAll,
      onUpdateStatus: $options.updateContactStatus,
      onSendEmail: $options.sendMassEmail,
      onClearSelection: $options.clearAllSelection
    }, null, _parent));
    _push(`</div>`);
  } else {
    _push(`<!---->`);
  }
  if ($data.activeTab === "analytics") {
    _push(`<div class="tab-content" data-v-c9cf0808>`);
    _push(ssrRenderComponent(_component_AnalyticsSection, {
      analytics: $data.analytics,
      loading: $data.loading
    }, null, _parent));
    _push(`</div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div></main></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const dashboard = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-c9cf0808"]]);

export { dashboard as default };
//# sourceMappingURL=dashboard-C16XsIn9.mjs.map
