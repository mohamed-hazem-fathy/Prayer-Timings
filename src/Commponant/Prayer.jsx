// eslint-disable-next-line no-unused-vars
import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
export default function prayer({name , time ,imge}) {
  return (
    <>
        <Card sx={{ width:"14vw" }}>
          <CardMedia
            sx={{ height: 140 }}
            image={imge}
            title="green iguana"
          />
          <CardContent>
            <h2 >
              {name}
            </h2>


            <Typography style={{fontSize:"30~px"}} >
              {time}
            </Typography>
          </CardContent>
        </Card>
        </>
      );
    }
    

