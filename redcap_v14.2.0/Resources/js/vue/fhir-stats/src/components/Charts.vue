<template>
<div v-show="loaded">
    <b-tabs content-class="mt-3" >
        <template #tabs-end>
            <div class="ml-auto" >
                
            </div>
        </template>

        <b-tab title="Overall" active>
            <TotalChart :chartdata="overall_total" />
            <DailyChart :chartdata="overall_daily" />
        </b-tab>

        <b-tab title="Clinical Data Mart">
            <TotalChart :chartdata="CDM_total" />
            <DailyChart :chartdata="CDM_daily" />
        </b-tab>

        <b-tab title="Clinical Data Pull">
            <TotalChart :chartdata="CDP_total" />
            <DailyChart :chartdata="CDP_daily" />
        </b-tab>

        <b-tab title="Clinical Data Pull (instant adjudication)">
            <TotalChart :chartdata="CDP_I_total" />
            <DailyChart :chartdata="CDP_I_daily" />
        </b-tab>
    </b-tabs>
    
    <b-button class="mt-2 text-white" size="sm" :href="metadata.export_link" download>
        <font-awesome-icon :icon="['fas', 'spinner']" spin fixed-width v-if="loading" />
        <font-awesome-icon :icon="['fas', 'file-archive']" fixed-width v-else />
        <span class="ms-2">Export CSV</span>
    </b-button>
</div>

</template>

<script>
import TotalChart from '@/components/charts/TotalChart'
import DailyChart from '@/components/charts/DailyChart'
import FhirDataChartAdapter from '@/libs/FhirDataChartAdapter'

const adapter = new FhirDataChartAdapter()

export default {
    components: { TotalChart,DailyChart, },
    data() {
        return {
            loading: false,
        }
    },
    computed: {
        loaded() { return this.$store.state.stats.loaded },
        overall_total() { return (adapter.makeTotalChartData(this.$store.state.stats.overall_total, 'Overall total')) },
        CDM_total() { return (adapter.makeTotalChartData(this.$store.state.stats.CDM_total, 'CDM total')) },
        CDP_total() { return (adapter.makeTotalChartData(this.$store.state.stats.CDP_total, 'CDP total')) },
        CDP_I_total() { return (adapter.makeTotalChartData(this.$store.state.stats.CDP_I_total, 'CDP instant adjudication total')) },
        
        overall_daily() { return adapter.makeDailyChartData(this.$store.state.stats.overall_daily) },
        CDM_daily() { return adapter.makeDailyChartData(this.$store.state.stats.CDM_daily) },
        CDP_daily() { return adapter.makeDailyChartData(this.$store.state.stats.CDP_daily) },
        CDP_I_daily() { return adapter.makeDailyChartData(this.$store.state.stats.CDP_I_daily) },
        cdm_users_count() { return this.$store.state.stats.cdm_users_count },
        date_from() { return this.$store.state.stats.date_from },
        date_to() { return this.$store.state.stats.date_to },
        metadata() { return this.$store.state.stats.metadata },
    },
    methods: {},
}
</script>

<style>

</style>