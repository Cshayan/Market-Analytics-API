/* Files that holds the logic to send response to front-end and send email to customers */

// Model
const PreferenceAndroid = require("../model/Preference");
const nodemailer = require("nodemailer");
const {
  google
} = require("googleapis");

exports.getPreferenceByEmail = async (req, res, next) => {
  try {
    // get the data from the request
    const {
      email,
      name,
      os,
      battery,
      ram,
      backCamera,
      frontCamera,
      memory,
      priceRange,
      screenSize
    } = req.body;

    // if the os is android
    if (os === "android") {
      // search the Android Model
      const Info = await PreferenceAndroid.find({}).select(
        `os.android.battery.${battery} 
                 os.android.ram.${ram}
                 os.android.backCamera.${backCamera}
                 os.android.frontCamera.${frontCamera}
                 os.android.memory.${memory}
                 os.android.price.${priceRange}
                 os.android.screenSize.${screenSize}`
      );

      // send the email
      sendEmail({
          email,
          name,
          Info
        }, {
          battery,
          ram,
          backCamera,
          frontCamera,
          memory,
          priceRange,
          screenSize
        },
        "android"
      );
    } else if (os === "ios") {}

    // Send the response
    res.status(200).json({
      success: true,
      message: `Thank you for taking the survey! An email has been sent to ${email} with contains the list of some preferred mobile brands that the customer can opt for.`
    });
  } catch (error) {
    console.log(error);
  }
};

// Function to send the email
const sendEmail = async (options, addInfo, os) => {
  // setup the OAuth
  const OAuth2 = google.auth.OAuth2;
  const oauth2_client = new OAuth2(
    process.env.client_id,
    process.env.client_secret,
    process.env.redirect_url
  );

  oauth2_client.setCredentials({
    refresh_token: process.env.refresh_token
  });

  const access_token = oauth2_client.getAccessToken();

  // Create the transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.user,
      clientId: process.env.client_id,
      clientSecret: process.env.client_secret,
      refreshToken: process.env.refresh_token,
      accessToken: access_token
    }
  });

  // Message to send in email
  const message = {
    from: process.env.user,
    to: options.email,
    subject: "Team Analytics Survey",
    html: `Dear ${options.name},<br>
               Thank you for taking the survey. We have prepared a list of mobile brands that you can opt for based on your preferences that you have submitted in the survey form. <br><br>
        
       <b>1. Battery - </b> <br>
          a) ${
            options.Info[0].os[`${os}`].battery[`${addInfo.battery}`][
              "brand"
            ][0]
          } <br>
          b) ${
            options.Info[0].os[`${os}`].battery[`${addInfo.battery}`][
              "brand"
            ][1]
          } <br>
          c) ${
            options.Info[0].os[`${os}`].battery[`${addInfo.battery}`][
              "brand"
            ][2]
          } 

        <br><br>

       <b>2. RAM - </b> <br>
          a) ${options.Info[0].os[`${os}`].ram[`${addInfo.ram}`]["brand"][0]}   <br>
          b) ${options.Info[0].os[`${os}`].ram[`${addInfo.ram}`]["brand"][1]}   

        <br><br>  

       <b>3. Memory - </b> <br>
          a) ${
            options.Info[0].os[`${os}`].memory[`${addInfo.memory}`]["brand"][0]
          }     <br>
          b) ${
            options.Info[0].os[`${os}`].memory[`${addInfo.memory}`]["brand"][1]
          }     

        <br><br> 

      <b> 4. FrontCamera - </b> <br>
          a) ${
            options.Info[0].os[`${os}`].frontCamera[`${addInfo.frontCamera}`][
              "brand"
            ][0] 
          }     <br>
          b) ${
            options.Info[0].os[`${os}`].frontCamera[`${addInfo.frontCamera}`][
              "brand"
            ][1]
          }     

        <br><br>  

      <b> 5. BackCamera - </b>  <br>
          a) ${
            options.Info[0].os[`${os}`].backCamera[`${addInfo.backCamera}`][
              "brand"
            ][0]
          }     <br>
          b) ${
            options.Info[0].os[`${os}`].backCamera[`${addInfo.backCamera}`][
              "brand"
            ][1]
          } 

        <br><br>  
        
     <b>  6. ScreenSize - </b> <br>
          a) ${
            options.Info[0].os[`${os}`].screenSize[`${addInfo.screenSize}`][
              "brand"
            ][0]
          }     <br>
          b) ${
            options.Info[0].os[`${os}`].screenSize[`${addInfo.screenSize}`][
              "brand"
            ][1]
          } 
        
        <br><br>

     <b>  7. Price - </b> <br>
          a) ${
            options.Info[0].os[`${os}`].price[`${addInfo.priceRange}`][
              "brand"
            ][0]
          }    <br>
          b) ${
            options.Info[0].os[`${os}`].price[`${addInfo.priceRange}`][
              "brand"
            ][1]
          }

        <br><br>
        Thanking you again for taking the survey with us.<br>
        Have a great day ahead.<br>
        Regards,<br>
        Team - Market Analytics`
  };

  // Send the email
  const info = await transporter.sendMail(message);

  console.log(info);
};