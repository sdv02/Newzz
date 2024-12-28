import { Typography } from "@mui/material";
import Box from "@mui/material/Box";

function Headlines(props) {
  const item = props.items || [];
  const topheadlines = item.slice(0, 10);
  //console.log(topheadlines);

  const headlineCard = {
    display: "inline-flex",
    alignItems: "flex-end",
    flexShrink: 0,
    padding: "20px",
    width: "700px",
    height: "300px",
    borderRadius: "10px",
    marginLeft: "10px",
    color: "white",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  };

  return (
    <Box
      sx={{
        margin: { md: "20px 280px", sm: "40px" },
        display: "flex",
        overflow: "auto",
      }}
    >
      {topheadlines.map((item) => {
        if (item.urlToImage) {
          return (
            <Box
              sx={headlineCard}
              key={item.url}
              onClick={() => {
                window.location.href = item.url;
              }}
              style={{
                backgroundImage: `linear-gradient(rgb(250 248 248 / 0%), rgb(33 31 31 / 78%)), url(${item.urlToImage})`,
              }}
            >
              <Typography variant="h5">{item.title}</Typography>
              <Typography>{item.description}</Typography>
            </Box>
          );
        }
      })}
    </Box>
  );
}

export default Headlines;
