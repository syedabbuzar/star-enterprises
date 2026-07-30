import Purchase from "../models/purchaseModel.js";
import PurchaseItem from "../models/purchaseItemModel.js";

// =============================
// Create Purchase
// =============================
export const createPurchaseService = async (data) => {
  const purchase = await Purchase.create({
    supplier: data.supplier,
    supplierGstin: data.supplierGstin,
    supplierState: data.supplierState,
    placeOfSupply: data.placeOfSupply,
    invoiceNo: data.invoiceNo,
    date: data.date,
    referenceNo: data.referenceNo,
    lrNo: data.lrNo,
    transport: data.transport,
    vehicleNo: data.vehicleNo,
    driver: data.driver,
    taxable: data.taxable,
    cgst: data.cgst,
    sgst: data.sgst,
    igst: data.igst,
    gstAmount: data.gstAmount,

    // Bill Discount
    discount: data.discount,

    total: data.total,
    narration: data.narration,
    remarks: data.remarks,
    note: data.note,
  });

  if (data.items && data.items.length > 0) {
    const items = data.items.map((item) => ({
      purchaseId: purchase._id,
      productId: item.productId,
      name: item.name,
      hsn: item.hsn,
      batch: item.batch,
      expiry: item.expiry,
      gstPct: item.gstPct,
      boxes: item.boxes,
      pieces: item.pieces,
      boxSize: item.boxSize,
      rate: item.rate,

      // Item Discount
      discount: item.discount,

      taxable: item.taxable,
      gstAmount: item.gstAmount,
      amount: item.amount,
    }));

    await PurchaseItem.insertMany(items);
  }

  return purchase;
};

// =============================
// Get All Purchases
// =============================
export const getAllPurchasesService = async () => {
  return await Purchase.find().sort({ createdAt: -1 });
};

// =============================
// Get Purchase By Id
// =============================
export const getPurchaseByIdService = async (id) => {
  const purchase = await Purchase.findById(id);

  if (!purchase) {
    return null;
  }

  const items = await PurchaseItem.find({
    purchaseId: purchase._id,
  });

  return {
    purchase,
    items,
  };
};

// =============================
// Update Purchase
// =============================
export const updatePurchaseService = async (id, data) => {
  const purchase = await Purchase.findByIdAndUpdate(
    id,
    {
      supplier: data.supplier,
      supplierGstin: data.supplierGstin,
      supplierState: data.supplierState,
      placeOfSupply: data.placeOfSupply,
      invoiceNo: data.invoiceNo,
      date: data.date,
      referenceNo: data.referenceNo,
      lrNo: data.lrNo,
      transport: data.transport,
      vehicleNo: data.vehicleNo,
      driver: data.driver,
      taxable: data.taxable,
      cgst: data.cgst,
      sgst: data.sgst,
      igst: data.igst,
      gstAmount: data.gstAmount,

      // Bill Discount
      discount: data.discount,

      total: data.total,
      narration: data.narration,
      remarks: data.remarks,
      note: data.note,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!purchase) {
    return null;
  }

  // Delete Old Items
  await PurchaseItem.deleteMany({
    purchaseId: purchase._id,
  });

  // Insert Updated Items
  if (data.items && data.items.length > 0) {
    const items = data.items.map((item) => ({
      purchaseId: purchase._id,
      productId: item.productId,
      name: item.name,
      hsn: item.hsn,
      batch: item.batch,
      expiry: item.expiry,
      gstPct: item.gstPct,
      boxes: item.boxes,
      pieces: item.pieces,
      boxSize: item.boxSize,
      rate: item.rate,

      // Item Discount
      discount: item.discount,

      taxable: item.taxable,
      gstAmount: item.gstAmount,
      amount: item.amount,
    }));

    await PurchaseItem.insertMany(items);
  }

  return purchase;
};

// =============================
// Delete Purchase
// =============================
export const deletePurchaseService = async (id) => {
  const purchase = await Purchase.findById(id);

  if (!purchase) {
    return null;
  }

  await PurchaseItem.deleteMany({
    purchaseId: purchase._id,
  });

  await Purchase.findByIdAndDelete(id);

  return purchase;
};