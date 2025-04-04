/**
 * Helper function untuk menetapkan errors ke form.
 * @param {Object} form - Instance form (dari Ant Design Form).
 * @param {Object} error - Objek ApiError dari handleApiError.
 */
export const setFormErrors = (form, error) => {
  if (error.errors && typeof error.errors === "object") {
    let fields = [];
    for (let key in error.errors) {
      fields.push({
        name: key,
        errors: error.errors[key] ?? false,
      });
    }
    form.setFields(fields);
  }
};
