
const axios = require('axios').default;
const { query } = require("./config");

const instruments = {
  'piano': 1,
  'guitar': 2,
  'violin': 3,
  'cello': 4,
  'ukulele': 5,
  'flute': 6,
  'saxophone': 7,
  'bass guitar': 8,
  'viola': 9,
  'voice': 10,
  'trumpet': 11,
  'drums': 12,
  'bassoon': 13,
  'trombone': 14,
  'upright bass': 15
}

const insertMusicalInstrument = (name) => {
  return new Promise((resolve, reject) => {
    query(
      `INSERT INTO instrument(name) VALUES($1) RETURNING *`,
      [name],
      (error, results) => {
        if (error) {
          console.log(error)
          reject(error)
        } else {
          resolve(results.rows[0].id)
        }
      }
    )
  })
}
const insertProfileTable = ({
  first_name,
  last_name,
  pickup_line,
  about,
  background,
  experience,
  city,
}) => {
  return new Promise((resolve, reject) => {
    query(
      `
      INSERT INTO profile(first_name, 
        last_name,
        pickup_line,
        about,
        background,
        experience,
        city) VALUES($1,$2,$3,$4,$5,$6,$7)
        RETURNING *
      `,
      [first_name, last_name, pickup_line, about, background, experience, city],
      (error, results) => {
        if (error) {
          console.log(error)
          reject(error)
        } else {
          resolve(results.rows[0])
        }
      }
    )
  })
}

const insertSkillTable = async (profile_id, skills) => {
  let valuesStr = `VALUES`
  for (let i = 0; i < skills.length; i++) {
    const item = skills[i];
    const ins = item.instrument;
    const level = item.level ? item.level : "advanced";
    let instrument_id = instruments[`${ins}`]
    if (!instrument_id) {
      instrument_id = await insertMusicalInstrument(ins);
      instruments[`${ins}`] = instrument_id;
    }
    valuesStr += `(${profile_id}, ${instrument_id}, '${level}', 1),`
  }
  valuesStr = valuesStr.slice(0, -1);

  return new Promise((resolve, reject) => {
    query(
      `
      INSERT INTO skill(profile_id, 
        instrument_id,
        level,
        week_frequency) ${valuesStr}
      `,
      (error, results) => {
        if (error) {
          console.log(error)
          reject(error)
        } else {
          resolve(results)
        }
      }
    )
  })
}

const insertPriceTable = (profile_id, pricings) => {
  let valuesStr = `VALUES`
  pricings.forEach(item => {
    const gross = item.gross_price ? item.gross_price : 60;
    const duration = item.duration ? item.duration : "60_min"
    valuesStr += `(${profile_id}, ${gross}, '${duration}', true),`
  })
  valuesStr = valuesStr.slice(0, -1);

  return new Promise((resolve, reject) => {
    query(
      `
      INSERT INTO pricing(profile_id, 
        gross_price,
        duration,
        enabled) ${valuesStr}
      `,
      (error, results) => {
        if (error) {
          console.log(error)
          reject(error)
        } else {
          resolve(results)
        }
      }
    )
  })
}

const insertMediaTable = (profile_id, medias) => {
  let valuesStr = `VALUES`
  medias.forEach(item => {
    const tag = item.tag;
    const type = item.type;
    const url = item.url;
    valuesStr += `(${profile_id},'${type}', '${tag}', '${url}'),`
  })
  valuesStr = valuesStr.slice(0, -1);

  return new Promise((resolve, reject) => {
    query(
      `
      INSERT INTO media(profile_id, 
        type,
        tag,
        url) ${valuesStr}
      `,
      (error, results) => {
        if (error) {
          console.log(valuesStr)
          reject(error)
        } else {
          resolve(results)
        }
      }
    )
  })
}

const results = axios.get("https://homemuse.io/api/v1/teachers/profiles", {
}).then(async results => {
  const data = results.data;
  if (data.status === 'OK') {
    const teachers = data.teachers;
    for (let i = 0; i < teachers.length; i++) {
      const profile = teachers[i];
      const skills = profile.skills;
      const pricings = profile.pricings;
      const medias = profile.medias;
      const profileInserted = await insertProfileTable(profile);
      await insertSkillTable(profileInserted.id, skills)
      insertPriceTable(profileInserted.id, pricings)
      insertMediaTable(profileInserted.id, medias)
    }
  }
})