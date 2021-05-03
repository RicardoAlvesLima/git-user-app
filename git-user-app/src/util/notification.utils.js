export const notifySuccess = (self, text) => {
    self.$vs.notification({
        position: 'top-right',
        border: 'success',
        title: 'Success',
        text: text
    })
}

export const notifyError = (self, text) => {
    self.$vs.notification({
        duration: 'none',
        position: 'top-right',
        border: 'danger',
        title: 'Error',
        text: text
    })
}

