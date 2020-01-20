import React, { FunctionComponent } from "react";
import Typography from "@material-ui/core/Typography";

type TitleProperties = {};

const Title: FunctionComponent<TitleProperties> = props => {
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      {props.children}
    </Typography>
  );
};

export default Title;
