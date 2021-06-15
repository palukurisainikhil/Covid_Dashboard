import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { truncate } from "./utils.js";
import "./MediaCard.css";

export default function MediaCard({ getCardData }) {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    media: {
      height: 140,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
    cardActions: {
      padding: "0 16px 8px 16px",
      display: "flex",
      justifyContent: "space-between",
    },
  }));
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container alignItems="stretch" spacing={3}>
        {getCardData.map((data) => (
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Paper className={classes.paper}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={
                    data.imageurl ||
                    "https://www.industry.gov.au/sites/default/files/August%202018/image/news-placeholder-738.png"
                  }
                />
                <CardContent>
                  <Typography
                    className={classes.title}
                    gutterBottom
                    variant="h5"
                    component="h4"
                  >
                    <b>{truncate(data.title, 30)}</b>
                  </Typography>
                  <CardContent>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      <p className="card_content">{data.content}</p>
                    </Typography>
                  </CardContent>
                </CardContent>
              </CardActionArea>
              <CardActions className={classes.cardActions}>
                <Button
                  variant="contained"
                  color="primary"
                  disableElevation
                  size="small"
                  href={data.url}
                  target="_blank"
                >
                  Learn More
                </Button>
              </CardActions>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
