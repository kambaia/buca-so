import mongoose, { model, Schema } from "mongoose";
const paymentSchema: Schema = new Schema({
    fee: {
        type: String,
        required: true // Atributo obrigatório
    },
    feeValor: {
        type: String,
    },
    monthQuantity: {
        type: String,
        required: true
    },
    fine: {
        type: String,
    },
    total: {
        type: String,
    },
    change: {
        type: String,
    },
    serielTransition: {
        type: String,
        require: true
    },
    serielDestinectionTranstion: {
        type: String,
        required: true
    },
    paymentDate: {
        type: String,
    },
    codeTransition: {
        type: String,
        required: true,
    },
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },
    registrationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Registration'
    },
    status: {
        type: Boolean,
     },
     schoolId: { type: mongoose.Schema.Types.ObjectId, ref: "School" },
     academicYearId: { type: mongoose.Schema.Types.ObjectId, ref: "AcademicYear" },

});


export default model('payment', paymentSchema);