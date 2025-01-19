<script setup>
import { ref, watch } from 'vue';
import { api } from 'src/boot/axios';

const props = defineProps(['instance', 'modelValue'])
const emit = defineEmits(['requestQr', 'update:modelValue'])
const value = ref(props.modelValue)

watch(() => props.modelValue, () => value.value = props.modelValue)

async function updateInstance(instance) {
    await api.post('whatsapp_instances', { ...instance, phone: '0' })
}
</script>

<template>
    <q-input
        outlined
        stack-label
        :label="`Instance ${instance.type}`"
        :modelValue="value"
        @update:modelValue="e => emit('update:modelValue', e)"
    >
        <template v-slot:append>
            <q-btn
                flat
                round
                size="12px"
                icon="qr_code"
                @click="emit('requestQr', instance)"
            ></q-btn>
            <q-btn
                flat
                round
                size="12px"
                icon="sym_o_save"
                @click="updateInstance(instance)"
            ></q-btn>
            <q-btn
                flat
                round
                size="12px"
                icon="sym_o_cardiology"
                @click="updateInstance(instance)"
            ></q-btn>
        </template>
    </q-input>
</template>