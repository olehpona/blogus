"use client"


import { useRef } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function SearchBar(){
    const inputRef = useRef<HTMLInputElement>(null);

    return (
      <>
        <div className="w-full flex space-x-2">
          <Input ref={inputRef} type="text" placeholder="Search" className="grow" />
          <Button className="w-16">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
                stroke="#ffffff"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </Button>
        </div>
      </>
    );
}