import React from "react"
import { skillsData } from "./skillsData.js"
import { Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import SkillItem from "./SkillItem"

const SkillSet = ({ data }) => {
  const useStyles = makeStyles({
    container: { margin: "auto" },
    root: {},
    hr: { color: "black", backgroundColor: "black", height: 1, width: "33vw" },
  })
  const classes = useStyles()
  return (
    <div>
      <Grid className={classes.container} container spacing={3}>
        {data.items.map((skill, index) => (
          <Grid item xs={2}>
            <SkillItem skill={skill} key={index} />
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

const Skills = () => {
  const useStyles = makeStyles({
    root: { textAlign: "center" },
    header: { fontSize: 30 },
    container: { margin: "auto" },
  })
  const classes = useStyles()
  return (
    <section>
      <div className={classes.root}></div>
      <ul>
        {skillsData.map((skillSet, index) => (
          <SkillSet data={skillSet} key={index} />
        ))}
      </ul>
    </section>
  )
}

export default Skills
