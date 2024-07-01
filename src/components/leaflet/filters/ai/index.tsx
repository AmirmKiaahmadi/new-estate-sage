import { ArrowLeft, PaperPlaneRight } from '@phosphor-icons/react'
import React, { useState } from 'react'
import AiImage from 'assets/images/map/ai.png'
import { Button, Input, MessageBox, MessageList } from 'react-chat-elements'
import TextArea from 'antd/es/input/TextArea'
import { UseMutateFunction } from 'react-query'
interface AiChatProps {
    setIsAiChat: React.Dispatch<React.SetStateAction<boolean>>
    setOpenChatAi: any
    mutate: UseMutateFunction<any, unknown, any, unknown>
    setAIData: React.Dispatch<React.SetStateAction<any[]>>
    setIsOpenPropertyFilter: React.Dispatch<React.SetStateAction<boolean>>
    setIsOpenPriceFilter: React.Dispatch<React.SetStateAction<boolean>>
    setChat: React.Dispatch<any>
    chat: any
    setSearch: React.Dispatch<React.SetStateAction<string>>
    search: string
}
export default function AiChat({
    setIsAiChat,
    setOpenChatAi,
    mutate,
    setAIData,
    setIsOpenPropertyFilter,
    setIsOpenPriceFilter,
    setChat,
    chat,
    setSearch,
    search,
}: AiChatProps) {
    const handleChat = () => {
        const newChat = [...chat]
        newChat.push({
            position: 'right',
            type: 'text',
            title: 'Amir',
            text: search,
        })
        setChat(newChat)
        mutate(search)
        setSearch('')
        setAIData([])
        setOpenChatAi([true])
    }

    return (
        <div className=" h-[65%] ">
            <div className=" grow-0 ">
                <ArrowLeft
                    size={20}
                    onClick={() => {
                        setIsAiChat(false)
                        setOpenChatAi(undefined)
                        setIsOpenPropertyFilter(false)
                        setIsOpenPriceFilter(false)
                    }}
                    className=" cursor-pointer"
                />
                <img src={AiImage} alt="ai" className="w-[5] h-[5] mx-auto" />
                <p className=" text-sm text-center text-[#494745]">Hello</p>
                <p className=" text-sm text-center text-[#494745] mb-2">
                    {' '}
                    Ask me for the house you want!
                </p>
            </div>
            <div className="  flex flex-col h-full  ">
                <div className="grow overflow-y-scroll">
                    {/* @ts-ignore */}
                    <MessageList
                        className="message-list overflow-hidden text-sm"
                        lockable={true}
                        // toBottomHeight={'100%'}
                        dataSource={chat}
                    />
                </div>
                <div className=" grow-0">
                    <div className="flex items-center justify-between text-sm">
                        <TextArea
                            placeholder="Ask from AI"
                            autoSize
                            className=" mr-2"
                            onChange={(e) => setSearch(e.target.value)}
                            value={search}
                        />
                        <PaperPlaneRight
                            size={40}
                            className=" cursor-pointer text-white bg-primary rounded-full p-3 "
                            onClick={() => handleChat()}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
