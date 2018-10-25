import React, { Component } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

class App extends Component {
  state = {
    phone: ""
  };
  render() {
    return (
      <div
        style={{
          maxWidth: 1000,
          margin: "0 auto",
          padding: 30
        }}
      >
        <div
          style={{
            height: "80vh"
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1517439270744-8d9287c2f8f8?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=fcc4318e8227a0be97ad7fd1199d5624&auto=format&fit=crop&w=2584&q=80"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover"
            }}
          />
        </div>
        <div
          style={{
            fontSize: ".9em",
            lineHeight: "1.4em",
            fontFamily: "PT Serif",
            maxWidth: 500,
            margin: "60px auto",
            textAlign: "justify"
          }}
        >
          <p
            style={{
              marginTop: 0
            }}
          >
            While social media can be a great way to connect, online harassment
            and trolls can sour Internet life; however, a new Twitter bot is
            trying to make self-care important part of your life online.
          </p>
          <p>
            The bot, which you can find on Twitter @tinycarebot, offers gentle
            reminders to its followers to improve their health and well-being.
            Some examples of their encouraging messages are “breathe deeply
            please” and “please remember to look up from your screen.”
          </p>
        </div>
        <div
          style={{
            background: "white",
            maxWidth: 500,
            margin: "0 auto",
            borderRadius: 5
          }}
        >
          <form
            style={{
              display: "flex",
              alignItems: "center"
            }}
          >
            <PhoneInput
              style={{
                flex: 1,
                paddingLeft: 20,
                borderBottom: "none"
              }}
              country="GB"
              placeholder="Enter phone number"
              value={this.state.phone}
              onChange={phone => this.setState({ phone })}
            />
            <input
              type="submit"
              style={{
                background: "#98a390",
                outline: "none",
                border: "none",
                width: 120,
                borderTopRightRadius: 5,
                borderBottomRightRadius: 5,
                padding: 20,
                cursor: "pointer"
              }}
            />
          </form>
        </div>
      </div>
    );
  }
}

export default App;
