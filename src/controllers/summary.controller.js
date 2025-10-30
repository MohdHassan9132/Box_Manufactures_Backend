import { Inventory, Labour, Job, WorkDone, Transportation } from "../models/index.js";

/**
 * Return a merged timeline of all events for the logged-in enterprise for a single date
 * Query: ?date=YYYY-MM-DD
 * Protected route (auth middleware must run before)
 */
export const getDailySummary = async (req, res) => {
  try {
    const enterpriseId = req.enterprise._id;
    const { date } = req.query;
    if (!date) return res.status(400).json({ success: false, message: "Date query required (YYYY-MM-DD)" });

    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    // fetch all collections in parallel
    const [inventory, labour, jobs, workDone, transport] = await Promise.all([
      Inventory.find({ enterprise_id: enterpriseId, date: { $gte: start, $lte: end } }).lean(),
      Labour.find({ enterprise_id: enterpriseId, /* labour may not have date, but include if createdAt in range */ createdAt: { $gte: start, $lte: end } }).lean(),
      Job.find({ enterprise_id: enterpriseId, createdAt: { $gte: start, $lte: end } }).lean(),
      WorkDone.find({ enterprise_id: enterpriseId, date: { $gte: start, $lte: end } }).lean(),
      Transportation.find({ enterprise_id: enterpriseId, date: { $gte: start, $lte: end } }).lean()
    ]);

    // Normalize items with a timestamp field then merge and sort
    const normalized = [];

    inventory.forEach(i => normalized.push({ type: "inventory", ts: i.createdAt || i.date, data: i }));
    labour.forEach(l => normalized.push({ type: "labour", ts: l.createdAt, data: l }));
    jobs.forEach(j => normalized.push({ type: "job", ts: j.createdAt, data: j }));
    workDone.forEach(w => normalized.push({ type: "workdone", ts: w.createdAt || w.date, data: w }));
    transport.forEach(t => normalized.push({ type: "transportation", ts: t.createdAt || t.date, data: t }));

    normalized.sort((a, b) => new Date(a.ts) - new Date(b.ts));

    res.status(200).json({
      success: true,
      date,
      timeline: normalized
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
