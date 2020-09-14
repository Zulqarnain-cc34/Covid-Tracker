import React from "react";
import "../Css/infobox.css";
import { Card, CardContent, Typography } from "@material-ui/core";

function InfoBox({ title, cases, isRed, total, active, ...props }) {
  return (
    <div className="infobox">
      <Card
        onClick={props.onClick}
        className={`infobox ${active && "infobox--selected"}  ${
          isRed && "infobox--red"
        }`}
      >
        <CardContent>
          <Typography className="infobox__title" color="textSecondary">
            {title}
          </Typography>
          <h2 className={`infobox__cases ${!isRed && "infobox--cases--green"}`}>
            {cases}
          </h2>
          <Typography className="infobox__total" color="textSecondary">
            {total} Total
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default InfoBox;
