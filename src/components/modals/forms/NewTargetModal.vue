<template>
  <!--begin::Modal - New Target-->
  <div
    class="modal fade"
    id="modal_form_dynamic"
    ref="newTargetModalRef"
    tabindex="-1"
    aria-hidden="true"
    v-if="dynamicForm"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <!--begin::Modal content-->
      <div class="modal-content rounded">
        <!--begin::Modal header-->
        <div class="modal-header pb-0 border-0 justify-content-end">
          <!--begin::Close-->
          <div
            class="btn btn-sm btn-icon btn-active-color-primary"
            data-bs-dismiss="modal"
          >
            <KTIcon icon-name="cross" icon-class="fs-1" />
          </div>
          <!--end::Close-->
        </div>
        <!--begin::Modal header-->

        <!--begin::Modal body-->
        <div class="modal-body scroll-y px-10 px-lg-15 pt-0 pb-15">
          <!--begin:Form-->
          <el-form
            id="modal_form_dynamic_form"
            @submit.prevent="submit()"
            class="form"
          >
            <!--begin::Heading-->
            <div class="mb-13 text-center">
              <!--begin::Title-->
              <h1 class="mb-3">Dynamic Form</h1>
              <!--end::Title-->
            </div>
            <!--end::Heading-->

            <!--begin::Input group-->
            <div v-if="dynamicForm[0]" class="mb-10">
              <h3 class="required pb-2">
                {{ dynamicForm[0].name }}
              </h3>
              <!--begin::Checkbox-->
              <div class="d-flex">
                <label
                  v-for="(val, index) in dynamicForm[0].values"
                  :key="index"
                  class="form-check form-check-custom form-check-solid me-5"
                >
                  <input
                    :value="val"
                    @change="checkBoxVal($event, val)"
                    class="form-check-input h-20px w-20px"
                    type="checkbox"
                  />

                  <span class="form-check-label fw-semibold"> {{ val }} </span>
                </label>
              </div>
              <!--end::Checkbox-->
            </div>
            <!--end::Input group-->

            <!--begin::Input group-->
            <div v-if="dynamicForm[1]" class="d-flex flex-column mb-8 fv-row">
              <!--begin::Label-->
              <label class="d-flex align-items-center fs-6 fw-semibold mb-2">
                <span class="required">{{ dynamicForm[1].name }}</span>
                <i
                  class="fas fa-exclamation-circle ms-2 fs-7"
                  data-bs-toggle="tooltip"
                  title="Specify a target name for future usage and reference"
                ></i>
              </label>
              <!--end::Label-->

              <el-form-item>
                <el-input
                  @change="getText"
                  v-model="dynamicForm[1].values"
                  placeholder="Enter Target Title"
                ></el-input>
              </el-form-item>
            </div>
            <!--end::Input group-->

            <!--begin::Options-->
            <div class="mb-10" v-if="dynamicForm[2]">
              <h3 class="required">{{ dynamicForm[2].name }}</h3>

              <!--begin::Check-->
              <div
                class="form-check form-check-custom form-check-success form-check-solid form-check-sm me-5"
              >
                <span
                  v-for="(val, index) in dynamicForm[2].values"
                  :key="index"
                  class="me-5"
                >
                  <input
                    v-model="selectedRadio"
                    @click="handleRadioChange(val)"
                    class="form-check-input"
                    type="radio"
                    :value="val"
                    :id="'kt_builder_page_width_' + val"
                  />
                  <!--begin::Label-->
                  <label
                    class="form-check-label text-gray-700 fw-bold text-nowrap"
                    :id="'kt_builder_page_width_' + val"
                    >{{ val }}</label
                  ></span
                >
                <!--end::Label-->
              </div>
              <!--end::Check-->
            </div>
            <!--end::Options-->

            <!--begin::Input group-->
            <div v-if="dynamicForm[3]" class="d-flex flex-column mb-8 fv-row">
              <h3 class="required">{{ dynamicForm[3].name }}</h3>
              <el-form-item prop="assign">
                <el-select
                  v-model="selectedValue"
                  placeholder="Select a Team Member"
                  name="assign"
                  as="select"
                >
                  <el-option
                    v-for="(val, index) in dynamicForm[3].values"
                    :key="index"
                    :value="val"
                  >
                    {{ val }}</el-option
                  >
                </el-select>
              </el-form-item>
            </div>
            <!--end::Input group-->

            <!--begin::Input group-->
            <div class="row g-9 mb-8" v-if="dynamicForm[5]">
              <!--begin::Col-->
              <div class="col-md-12 fv-row">
                <label class="required fs-6 fw-semibold mb-2">{{
                  dynamicForm[5].name
                }}</label>

                <!--begin::Input-->
                <div class="position-relative align-items-center">
                  <!--begin::Datepicker-->
                  <el-form-item prop="dueDate">
                    <el-date-picker
                      v-model="dynamicForm[5].values"
                      @change="getDate"
                      type="date"
                      placeholder="Select a date"
                      :teleported="false"
                      popper-class="override-styles"
                      name="dueDate"
                    />
                  </el-form-item>
                  <!--end::Datepicker-->
                </div>
                <!--end::Input-->
              </div>
              <!--end::Col-->
            </div>
            <!--end::Input group-->

            <!--begin::Input group-->
            <div v-if="dynamicForm[4]" class="d-flex mb-8 fv-row">
              <div class="file-input">
                <input
                  @change="selectedImg"
                  class="file"
                  id="file"
                  type="file"
                  name="avatar"
                  accept=".png, .jpg, .jpeg"
                />
                <label for="file"> {{ dynamicForm[4].name }} </label>
              </div>
            </div>
            <!--end::Input group-->

            <!--begin::Actions-->
            <div class="text-center">
              <button
                type="reset"
                id="modal_form_dynamic_cancel"
                class="btn btn-light me-3"
              >
                Cancel
              </button>

              <!--begin::Button-->
              <button
                :data-kt-indicator="loading ? 'on' : null"
                class="btn btn-lg btn-primary"
                type="submit"
              >
                <span v-if="!loading" class="indicator-label">
                  Save
                  <KTIcon icon-name="arrow-right" icon-class="fs-3 ms-2 me-0" />
                </span>
                <span v-if="loading" class="indicator-progress">
                  Please wait...
                  <span
                    class="spinner-border spinner-border-sm align-middle ms-2"
                  ></span>
                </span>
              </button>
              <!--end::Button-->
            </div>
            <!--end::Actions-->
          </el-form>
          <!--end:Form-->
        </div>
        <!--end::Modal body-->
      </div>
      <!--end::Modal content-->
    </div>
    <!--end::Modal dialog-->
  </div>
  <!--end::Modal - New Target-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, ref } from "vue";
import { hideModal } from "@/core/helpers/modal";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { storeToRefs } from "pinia";
import { useDynamicFormStore } from "@/stores/DynamicForm";

export default defineComponent({
  name: "new-target-modal",
  components: {},
  setup() {
    const formRef = ref<null | HTMLFormElement>(null);
    const newTargetModalRef = ref<null | HTMLElement>(null);
    const loading = ref<boolean>(false);
    const dynamic = useDynamicFormStore();
    const { dynamicForm, responseDynamicForm } = storeToRefs(dynamic);

    const imageFile = ref(null);
    const imageName = ref(null);
    const selectedRadio = ref(false);
    const selectedValue = ref("");
    const newDate = ref("");
    const textMsg = ref("");

    interface DynamicForm {
      id: number;
      type: number;
      name: string;
      placeHolder: null | string;
      values: string[] | null;
    }

    const formData = ref<DynamicForm>({
      id: 0,
      type: 0,
      name: "",
      placeHolder: "",
      values: [],
    });

    const rules = ref({
      targetTitle: [
        {
          required: true,
          message: "Please input Activity name",
          trigger: "blur",
        },
      ],
      dropdown: [
        {
          required: true,
          message: "Please select Activity zone",
          trigger: "change",
        },
      ],
      date: [
        {
          required: true,
          message: "Please select Activity zone",
          trigger: "change",
        },
      ],
      check: [
        {
          required: true,
          message: "Please select Activity zone",
          trigger: "change",
        },
      ],
      image: [
        {
          required: true,
          message: "Please select Activity zone",
          trigger: "change",
        },
      ],
      radio: [
        {
          required: true,
          message: "Please select Activity zone",
          trigger: "change",
        },
      ],
    });

    const checkedValues = ref<string[]>([]);

    const selectedImg = (event: any) => {
      imageFile.value = event.target.files[0];
      imageName.value = event.target.files[0].name;
    };

    const checkBoxVal = (event: any, value: string) => {
      if (event.target.checked) {
        console.log("Checked value:", value);
        checkedValues.value.push(value);
      } else if (!event.target.checked) {
        const indexToRemove = checkedValues.value.indexOf(value);
        if (indexToRemove !== -1) {
          checkedValues.value.splice(indexToRemove, 1);
        }
      }
    };

    const handleRadioChange = (newValue: any) => {
      if (newValue === selectedRadio.value) {
        selectedRadio.value = false;
      } else {
        selectedRadio.value = newValue;
      }
    };

    const getDate = (event: any) => {
      newDate.value = event;
    };

    const getText = (event: any) => {
      textMsg.value = event;
    };

    const submit = async () => {
      // if (!formRef.value) {
      //   return;
      // }
      const saveData = [
        {
          dfid: 1,
          value: checkedValues.value.join(),
        },
        {
          dfid: 2,
          value: textMsg.value,
        },
        {
          dfid: 3,
          value: selectedRadio.value,
        },
        {
          dfid: 4,
          value: selectedValue.value,
        },
        {
          dfid: 5,
          value: imageName.value,
        },
        {
          dfid: 6,
          value: newDate.value,
        },
      ];
      await dynamic.sendDynamicFormData(saveData);

      // formRef.value.validate(async (valid: boolean) => {
      // if (responseDynamicForm) {
      //   loading.value = true;

      //   setTimeout(() => {
      //     loading.value = false;

      //     Swal.fire({
      //       text: "Form has been successfully submitted!",
      //       icon: "success",
      //       buttonsStyling: false,
      //       confirmButtonText: "Ok, got it!",
      //       heightAuto: false,
      //       customClass: {
      //         confirmButton: "btn btn-primary",
      //       },
      //     }).then(() => {
      //       hideModal(newTargetModalRef.value);
      //       dynamic.$reset();
      //     });
      //   }, 2000);
      // } else {
      //   Swal.fire({
      //     text: "Sorry, looks like there are some errors detected, please try again.",
      //     icon: "error",
      //     buttonsStyling: false,
      //     confirmButtonText: "Ok, got it!",
      //     heightAuto: false,
      //     customClass: {
      //       confirmButton: "btn btn-primary",
      //     },
      //   });
      //   return false;
      // }
      // });
    };

    return {
      dynamicForm,
      loading,
      newTargetModalRef,
      selectedRadio,
      selectedValue,
      newDate,
      textMsg,
      rules,
      responseDynamicForm,
      handleRadioChange,
      getText,
      getDate,
      selectedImg,
      checkBoxVal,
      getAssetPath,
      submit,
    };
  },
});
</script>

<style lang="scss">
.el-select {
  width: 100%;
}

.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}

.override-styles {
  z-index: 99999 !important;
  pointer-events: initial;
}

.file {
  opacity: 0;
  width: 0.1px;
  height: 0.1px;
  position: absolute;
}

.file-input label {
  font-size: 15px;
  display: block;
  position: relative;
  width: 200px;
  height: 50px;
  border-radius: 25px;
  background-color: #006ae6;
  box-shadow: 0 4px 7px rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  cursor: pointer;
  transition: 0.3s;
}

.file-input input:hover + label,
.file-input input:focus + label {
  background-color: #197ef1;
}
</style>
