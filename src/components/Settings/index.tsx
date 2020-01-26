import React, { FunctionComponent } from "react";
import clsx from "clsx";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import Slider from "@material-ui/core/Slider";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Input from "@material-ui/core/Input";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap"
    },
    margin: {
      margin: theme.spacing(2)
    },
    withoutLabel: {
      marginTop: theme.spacing(3)
    },
    textField: {
      width: "40%"
    },
    sliderRoot: {
      width: "40%"
    },
    sliderInput: {
      width: 42
    }
  })
);

interface SettingsProperties {
  maxDepth: number;
}

interface State {
  volume: number;
  depth: number;
  regRange: number;
  controlDepth: number;
  diameter: number;
  lossCoeff: number;
}

const Settings: FunctionComponent<SettingsProperties> = ({ maxDepth }) => {
  const classes = useStyles();

  const [values, setValues] = React.useState<State>({
    volume: 0,
    depth: 0,
    regRange: 0,
    controlDepth: 0,
    diameter: 100,
    lossCoeff: 2
  });

  const handleChange = (prop: keyof State) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue =
      event.target.value === "" ? "" : Number(event.target.value);
    setValues({ ...values, [prop]: newValue });
  };

  const handleSliderChange = (prop: keyof State) => (
    event: any,
    newValue: number | number[]
  ) => {
    setValues({ ...values, [prop]: newValue });
  };

  const handleBlur = (prop: keyof State, min: number, max: number) => () => {
    if (values[prop] < min) {
      setValues({ ...values, [prop]: min });
    } else if (values[prop] > max) {
      setValues({ ...values, [prop]: max });
    }
  };

  //Control Depth (m)
  //Reg Range (m)
  //Diameter (m)
  // Loss Coeff. (Open)

  return (
    <div className={classes.root}>
      <div>
        <TextField
          label="Tank Volume"
          type="number"
          className={clsx(classes.margin, classes.textField)}
          value={values.volume}
          onChange={handleChange("volume")}
          InputProps={{
            endAdornment: <InputAdornment position="end">ML</InputAdornment>
          }}
        />
        <TextField
          label="Depth"
          type="number"
          className={clsx(classes.margin, classes.textField)}
          value={values.depth}
          onChange={handleChange("depth")}
          InputProps={{
            endAdornment: <InputAdornment position="end">m</InputAdornment>
          }}
        />
        <TextField
          label="Float Valve Diameter"
          type="number"
          className={clsx(classes.margin, classes.textField)}
          value={values.diameter}
          onChange={handleChange("diameter")}
          InputProps={{
            endAdornment: <InputAdornment position="end">mm</InputAdornment>
          }}
        />
        <TextField
          label="Loss Coeff. (Open)"
          type="number"
          className={clsx(classes.margin, classes.textField)}
          value={values.lossCoeff}
          onChange={handleChange("lossCoeff")}
        />
        <TextField
          label="Control Depth"
          type="number"
          className={clsx(classes.margin, classes.textField)}
          value={values.controlDepth}
          onChange={handleChange("controlDepth")}
          InputProps={{
            endAdornment: <InputAdornment position="end">m</InputAdornment>
          }}
        />
        <TextField
          label="Regulation Range"
          type="number"
          className={clsx(classes.margin, classes.textField)}
          value={values.regRange}
          onChange={handleChange("regRange")}
          InputProps={{
            endAdornment: <InputAdornment position="end">m</InputAdornment>
          }}
        />

        <div className={classes.sliderRoot}>
          <Typography id="input-slider" gutterBottom>
            Control Depth
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs>
              <Slider
                value={
                  typeof values.controlDepth === "number"
                    ? values.controlDepth
                    : 0
                }
                onChange={handleSliderChange("controlDepth")}
                aria-labelledby="input-slider"
              />
            </Grid>
            <Grid item>
              <TextField
                label="Control Depth"
                type="number"
                className={clsx(classes.margin, classes.textField)}
                value={values.controlDepth}
                onChange={handleChange("controlDepth")}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">m</InputAdornment>
                  )
                }}
              />
            </Grid>
          </Grid>
        </div>

        <Slider
          value={Number(values.controlDepth)}
          onChange={handleSliderChange("controlDepth")}
          aria-labelledby="continuous-slider"
        />
      </div>
    </div>
  );
};

export default Settings;
