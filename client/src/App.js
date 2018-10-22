import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div style={{
maxWidth: 1000,
display: 'grid',
margin: '0 auto',
gridGap: 10,
padding: 30,
gridTemplateColumns: 'repeat(3, 1fr)',
gridTemplateRows: 'auto 500px auto'
			}}>
<div>
<h1>Carebot</h1>
</div>
        <div style={{
					gridColumn: '1 / 3',
					fontSize: '2em'
				}}>
          <p>While social media can be a great way to connect, online harassment and trolls can sour Internet life; however, a new Twitter bot is trying to make self-care important part of your life online.</p>
          <p>The bot, which you can find on Twitter @tinycarebot, offers gentle reminders to its followers to improve their health and well-being. Some examples of their encouraging messages are “breathe deeply please” and “please remember to look up from your screen.”</p>
          <p>Made by @bookercode, inspired heavily by @tinycarebot.</p>
        </div>
				<div style={{
					gridColumn: '3 / -1', 
				}}>
					<img 
						src="https://images.unsplash.com/photo-1519923834699-ef0b7cde4712?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f4db6887365e9fc430a311ba4250f44e&auto=format&fit=crop&w=1568&q=80" 
						style={{
							width: '100%',
							height: '100%',
objectFit:'cover'
						}}/>
				</div>
				<div style={{
					gridColumn: '1 / -1',
					background: '#f1f1f1',
					padding: 10
				}}>
					<h1>Submit</h1>
					<form>
<p>lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum</p>
						<input type="text"/>
					</form>
				</div>
      </div>
    );
  }
}

export default App;
