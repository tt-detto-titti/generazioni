const db = require('../models');
const Richiesta = db.richiesta;
const Offerta = db.offerta;

const controllaMatchOfferta = async (offerta) => {
  try {
    return await Richiesta.find({
      $expr: {
        $and: [
          // La data e ora d'inizio della richiesta dev'essere dopo la data e ora d'inizio della disponibilità
          { $gte: ['$data', new Date(offerta.data)] },
          // La data e ora d'inizio della richiesta dev'essere prima la data e ora d'inizio della disponibilità + la durata
          { $lte: ['$data', { $dateAdd: { startDate: offerta.data, unit: 'minute', amount: offerta.durata } }] }
        ]
      },
      stato: 'in attesa'
    });
  } catch (err) {
    console.error(err.message);
  }
};

const controllaMatchRichiesta = async (richiesta) => {
  try {
    return await Offerta.find({
      $expr: {
        $and: [
          // La data e ora d'inizio della disponibilità dev'essere prima della data e ora d'inizio della richiesta
          { $lte: ['$data', new Date(richiesta.data)] },
          // La data e ora d'inizio + la durata della disponibilità dev'essere dopo la data e ora d'inizio della richiesta
          { $gte: [{ $dateAdd: { startDate: '$data', unit: 'minute', amount: '$durata' } }, new Date(richiesta.data)] }
        ]
      }
    })
      .populate('id_volontario')
      .exec();
  } catch (err) {
    console.error(err.message);
  }
};

const MatchmakerService = {
  controllaMatchOfferta,
  controllaMatchRichiesta
};

module.exports = MatchmakerService;
