const express = require('express');
const router  = express.Router();
const resorts = require('../data/resorts.json');   // 6-item demo file

const R   = 6371;               // Earth radius km
const rad = d => d * Math.PI/180;
const km  = (aLat,aLon,bLat,bLon)=>{
  const dLat=rad(bLat-aLat), dLon=rad(bLon-aLon);
  const h = Math.sin(dLat/2)**2 +
            Math.cos(rad(aLat))*Math.cos(rad(bLat))*Math.sin(dLon/2)**2;
  return 2*R*Math.asin(Math.sqrt(h));
};

// GET /api/resorts?lat=…&lon=…&limit=6
router.get('/', (req,res)=>{
  const { lat, lon, limit = 6 } = req.query;
  if(!lat||!lon) return res.status(400).json({ error:'lat & lon required' });

   const near = resorts
    .map(r => {
    const d = km(+lat, +lon, r.lat, r.lon);
    return { ...r, distance: Number.isFinite(d) ? d : Infinity };
  })
  .sort((a, b) => a.distance - b.distance)
  .slice(0, +limit);

  res.json(near);
});

module.exports = router;
