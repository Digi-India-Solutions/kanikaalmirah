import { Certificate } from "../model/certificate.model.js";
import { deleteFromCloudinary, uploadOnCloudinary } from "../utils/cloudinary.util.js";

const createCertificate = async (req, res) => {
  try {
    const { isActive } = req.body || {};
    if (!isActive) {
      return res.status(400).json({ message: "isActive is required" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Certificate image is required" });
    }
    const localPath = req?.file?.path;
    const certificateImage = await uploadOnCloudinary(localPath);
    if (!certificateImage) {
      return res.status(400).json({ message: "Certificate image is required" });
    }

    const newCertificate = await Certificate.create({
      certificateImage,
      isActive,
    });
    return res.status(201).json({
      message: "Certificate created successfully",
      newCertificate,
    });
  } catch (error) {
    console.log("create certificate error", error);
    return res.status(500).json({
      message: "Failed to create certificate",
      error: error.message,
    });
  }
};

const updateCertificate = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Certificate ID is required" });
    }
    const { isActive } = req.body || {};
    const certificate = await Certificate.findById(id);
    if (!certificate) {
      return res.status(400).json({
        error: "certificate not found",
      });
    }
    if (req.file && req.file?.path) {
      await deleteFromCloudinary(certificate?.certificateImage);
      const certificateImage = await uploadOnCloudinary(req.file.path);
      certificate.certificateImage = certificateImage;
    } else {
      certificate.certificateImage = certificate.certificateImage;
    }

    certificate.isActive = isActive ?? certificate.isActive;
 
  const updatedCertificate=  await certificate.save({})
    return res.status(200).json({
      message: "Certificate updated successfully",
      updatedCertificate
    });
  } catch (error) {
    console.log("update certificate error", error);
    return res.status(500).json({
      message: "Failed to update certificate",
      error: error.message,
    });
  }
};

const getAllCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find();
    return res.status(200).json({
      message: "Certificates retrieved successfully",
      certificates,
    });
  } catch (error) {
    console.log("get all certificates error", error);
    return res.status(500).json({
      message: "Failed to retrieve certificates",
      error: error.message,
    });
  }
};


const getSingleCertificate = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Certificate ID is required" });
    }
    const certificate = await Certificate.findById(id);
    if (!certificate) {
      return res.status(404).json({ message: "Certificate not found" });
    }
    return res.status(200).json({
      message: "Certificate retrieved successfully",
      certificate,
    });
  } catch (error) {
    console.log("get single certificate error", error);
    return res.status(500).json({
      message: "Failed to retrieve certificate",
      error: error.message,
    });
  }
};

// Delete a certificate by ID
const deleteCertificate = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Certificate ID is required" });
    }
    const deletedCertificate = await Certificate.findByIdAndDelete(id);
    if (!deletedCertificate) {
      return res.status(404).json({ message: "Certificate not found" });
    }
    return res.status(200).json({
      message: "Certificate deleted successfully",
      deletedCertificate,
    });
  } catch (error) {
    console.log("delete certificate error", error);
    return res.status(500).json({
      message: "Failed to delete certificate",
      error: error.message,
    });
  }
};

export {
  createCertificate,
  getAllCertificates,
  getSingleCertificate,
  updateCertificate,
  deleteCertificate,
};
