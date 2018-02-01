'use strict'

const CompetenceHook = exports = module.exports = {}

CompetenceHook.pivotFlatten = async (competences) => {
  //TODO: Figure out how it finds pivot_exprience_years
  competences.forEach(c => {
    c.experience_years = c.pivot_experience_years
  })
}
