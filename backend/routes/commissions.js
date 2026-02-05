const express = require('express');
const router = express.Router();

const { calculerCommission } = require('../services/commissionServices');

// GET /api/commissions/:parrainId
router.get('/:parrainId', async (req, res) => {
  try {
    const parrainId = parseInt(req.params.parrainId);
    const total = await calculerCommission(parrainId);

    res.json({
      parrainId,
      commission_totale: total
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
