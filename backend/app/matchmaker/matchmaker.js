const db = require("../models");
const Richiesta = db.richiesta;

const controllaMatch = async (offerta) => {
  try {
    const richieste = await Richiesta.find({
      data: {
        $gte: new Date(offerta.data.setHours(0, 0, 0, 0)),
        $lt: new Date(offerta.data.setHours(23, 59, 59, 999)),
      },
      $expr: {
        $lte: [
          {
            $add: [
              { $multiply: [{ $hour: "$data" }, 60] },
              { $minute: "$data" },
            ],
          },
          {
            $add: [
              { $multiply: [{ $hour: offerta.data }, 60] },
              { $minute: offerta.data },
              offerta.durata,
            ],
          },
        ],
      },
      // TODO capire perché non funziona la parte destra dell'AND
      // $expr: {
      //   $and: [
      //     {
      //       $lte: [
      //         {
      //           $add: [
      //             { $multiply: [{ $hour: "$data" }, 60] },
      //             { $minute: "$data" },
      //           ],
      //         },
      //         {
      //           $add: [
      //             { $multiply: [{ $hour: offerta.data }, 60] },
      //             { $minute: offerta.data },
      //             offerta.durata,
      //           ],
      //         },
      //       ],
      //     },
      //     {
      //       $gte: [
      //         {
      //           $add: [
      //             { $multiply: [{ $hour: "$data" }, 60] },
      //             { $minute: "$data" },
      //           ],
      //         },
      //         {
      //           $add: [
      //             { $multiply: [{ $hour: offerta.data }, 60] },
      //             { $minute: offerta.data },
      //           ],
      //         },
      //       ],
      //     },
      //   ],
      // },
      stato: "in attesa",
    });

    if (richieste.length > 0) {
      console.log("ho trovato delle richieste!");
    }

    return richieste;
  } catch (err) {
    console.error(err.message);
  }
};

const MatchMaker = {
  controllaMatch,
};

module.exports = MatchMaker;
