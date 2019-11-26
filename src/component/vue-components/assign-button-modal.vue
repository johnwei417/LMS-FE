<template>
  <div>
    <button type="button" class="btn btn-primary" data-toggle="modal" data-target=".bd-example-modal-sm">Assign Modules</button>
    <div class="modal fade bd-example-modal-sm" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="card" style="width: 18rem;">
              <div class="card-header">
                Featured
              </div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">Cras justo odio</li>
                <li class="list-group-item">Dapibus ac facilisis in</li>
                <li class="list-group-item">Vestibulum at eros</li>
              </ul>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
        return {

        }
    },
    methods: {

    }
  }
</script>

<style>
.centered{
    margin-left:auto;
    margin-right:auto;
}
</style>