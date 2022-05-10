import { Box, Center } from "@chakra-ui/react";
import {
  FormControl,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { ChangeEventHandler, useRef, useState } from "react";
import { BiImage } from "react-icons/bi";

export default function Home() {
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [placeholder, setPlaceholder] = useState<string>();

  const handleSubmit: ChangeEventHandler = async (e) => {
    if (!inputRef.current.files || inputRef.current.files.length == 0) return;
    setPlaceholder("Uploading...");

    const formData = new FormData();
    formData.append("file", inputRef.current.files[0]);

    const res = await fetch("/api/upload", {
      method: "post",
      body: formData,
    });
    location.href = `/${(await res.json()).fileName}`;
  };

  return (
    <Center h="100vh" w="full" bgColor="gray.900">
      <Box boxShadow="2xl" borderRadius={10} bgColor="gray.800">
        <FormControl>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <Icon as={BiImage} color="white" />
            </InputLeftElement>
            <input
              type="file"
              accept="image/*"
              name="file"
              ref={inputRef}
              style={{ display: "none" }}
              onChange={handleSubmit}
            ></input>
            <Input
              placeholder={placeholder || "Select image"}
              onClick={() => inputRef?.current.click()}
              readOnly={true}
              cursor="default"
            />
          </InputGroup>
        </FormControl>
      </Box>
    </Center>
  );
}
