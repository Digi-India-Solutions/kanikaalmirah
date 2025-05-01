import { Inquiry } from "../model/inquiry.model.js";

const createInquiry = async (req, res) => {
    try {
        const { FullName, email,phone,subject,EnquiryType, message } = req.body || {};
       if(!FullName || !email || !phone || !subject || !EnquiryType || !message){
        return res.status(400).json({ message: "All fields are required" });
       }
        const newInquiry = await Inquiry.create({ FullName, email,phone,subject,EnquiryType, message });
        return res.status(200).json({ message: "Inquiry created successfully",newInquiry });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error });
    }
};

const getAllInquiries = async (req, res) => {
    try {
        const inquiries = await Inquiry.find();
        return res.status(200).json({ message: "All inquiries", inquiries });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error });
    }
};

const deleteInquiry = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "Inquiry id is required" });
        }
        const deletedInquiry = await Inquiry.findByIdAndDelete(id);
        if (!deletedInquiry) {
            return res.status(404).json({ message: "Inquiry not found" });
        }
        return res.status(200).json({ message: "Inquiry deleted successfully", deletedInquiry });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error });
    }
};

export { createInquiry, getAllInquiries, deleteInquiry };