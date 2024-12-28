import DateDifference from "./DateTime";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea } from "@mui/material";
import { ApiResponseType } from "./types";

type PropType = {
  items: ApiResponseType[];
};

function Popularity(props: PropType) {
  const popularitems = props.items;
  const refined = popularitems.slice(0, 15);

  return (
    <Box sx={{ margin: "5px", padding: "20px" }}>
      <Typography
        variant="h5"
        style={{
          borderBottom: "solid grey 3px",
          margin: "0px 50px",
          marginTop: "10px",
          fontFamily: "none",
        }}
      >
        {" "}
        Popular this week
      </Typography>
      {refined.map((item) => {
        if (item.urlToImage) {
          return (
            <Card
              sx={{ maxWidth: 305, padding: "10px", margin: "20px" }}
              key={item.url}
            >
              <CardActionArea
                onClick={() => {
                  window.location.href = item.url;
                }}
              >
                <CardMedia
                  component="img"
                  height="150"
                  width="180"
                  image={item.urlToImage}
                  alt="Oops! Couldn't load img"
                />
                <CardContent>
                  <Typography>{item.title}</Typography>
                  <Typography>
                    <DateDifference dateString={item.publishedAt} />
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          );
        }
      })}
    </Box>
  );
}

export default Popularity;
