'use client'

import { Box, Stack, TextField, Button, Typography } from "@mui/material";
import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useChat } from 'ai/react';
import Markdown from "./components/Markdown";



export default function Home() {

  const firstMessage = 'Hello! I am SmartHome Assist AI, designed to manage your home environment to tackle unique challenges surrounding energy supply in Pakistan. How may I help you today?'

  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])

  async function sendMessage() {
    setMessage('')
    //setMessages(messages => [...messages, { role: 'user', parts: [{ text: message }]}])
    setMessages((prevMessages) => [...prevMessages, { role: 'user', parts: [{ text: message }]}])
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        "Content-type": "application/json"
      }, 
      body: JSON.stringify([...messages,  { role: 'user', parts: [{ text: message }]} ])
    })

    const msg = await response.json()
    //setMessages(messages => [...messages, { role: 'model', parts: [{ text: data }]}])
    setMessages((prevMessages) => [...prevMessages, { role: 'model', parts: [{ text: msg}]}])
    
  }
 

  return (
    <Box /*bgcolor={'#212121'}*/ display={'flex'} justifyContent={'center'} alignItems={'center'}  width={'100vw'} height={'100vh'} >
      <Stack p={2} direction={'column'} width={'90%'} height={'90%'} border="1px solid black">
        <Stack direction={'column'} flexGrow={1} gap={'3%'} overflow={'auto'} maxHeight={'100%'}>
        <Box display={'flex'} justifyContent={'flex-end'} bgcolor={'primary.main'} borderRadius={10} p={2}>
          <Typography variant="h7" bgcolor={'primary.main'} color={'white'}>{firstMessage}</Typography>
        </Box>
          {messages.map((message, index) => {
            return <Box key={index} display={'flex'} justifyContent={message.role == 'user' ? 'flex-end' : 'flex-start'} > 
              <Box  color={'white'} borderRadius={10} p={3} bgcolor={message.role == 'user' ? 'secondary.main' : 'primary.main'} >
                <Typography variant="h7">
                  <Markdown text={message['parts'][0]['text']} />
                
                </Typography>
                

              </Box>
            </Box>
          })}
        </Stack>
        <Stack  display={'flex'} direction={'row'} spacing={2}>
          <TextField value={message}  fullWidth placeholder="Message" onChange={(e) => setMessage(e.target.value)}></TextField>
          <Button type="submit" variant="contained" onClick={sendMessage} /*onClick={() => {
            handleSubmit({
              data: {
                prompt: input
              }
            })
          }}*/>Send</Button>
          <Typography variant="body1"></Typography>
        </Stack>
      </Stack>

      
    </Box>

  );
}
