<template>
  <div class="phone-input-wrapper">
    <label class="input-label">{{ label }}</label>
    <input
      type="tel"
      class="native-phone-input"
      :placeholder="placeholder || '+33 6 12 34 56 78'"
      :value="modelValue"
      :disabled="disabled"
      :required="required"
      maxlength="40"
      @input="$emit('update:modelValue', $event.target.value)"
      @blur="$emit('blur')"
    />
    <button v-if="modelValue" class="clear-btn" @click="$emit('update:modelValue', '')" type="button" aria-label="Effacer le numéro">×</button>
    <div class="input-decoration"></div>
    <div v-if="error" class="error-message">{{ error }}</div>
  </div>
</template>

<script>
export default {
  name: 'PhoneInput',
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: 'Téléphone'
    },
    placeholder: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: true
    },
    error: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue', 'blur']
}
</script>

<style scoped>
.phone-input-wrapper {
  position: relative;
  z-index: 10;
  overflow: visible;
  width: 100%;
}
.input-label {
  display: block;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  transition: all 0.3s ease;
}
.native-phone-input {
  width: 100%;
  padding: 1.25rem 2.5rem 1.25rem 0;
  border: none;
  border-bottom: 2px solid var(--border-color);
  background: transparent;
  color: var(--text-primary);
  font-size: 1rem;
  font-weight: 400;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  outline: none;
  border-radius: 0;
  box-sizing: border-box;
}
.native-phone-input:focus {
  border-bottom-color: var(--text-primary);
}
.native-phone-input::placeholder {
  color: var(--text-light);
  font-weight: 400;
  transition: all 0.3s ease;
}
.clear-btn {
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: var(--text-light);
  font-size: 1.3rem;
  cursor: pointer;
  padding: 0;
  line-height: 1;
  z-index: 2;
  transition: color 0.2s;
}
.clear-btn:hover {
  color: var(--text-primary);
}
.input-decoration {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--text-primary);
  transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.phone-input-wrapper:focus-within .input-decoration {
  width: 100%;
}
.error-message {
  color: var(--text-primary);
  font-size: 0.875rem;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}
.error-message::before {
  content: '⚠️';
  font-size: 0.75rem;
}
</style>
