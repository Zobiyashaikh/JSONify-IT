"use client";
import { useState } from "react";
import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { Switch } from "@/components/ui/switch"
import { HiDocumentArrowDown, HiOutlineArrowPath } from "react-icons/hi2";
import { AiOutlineSave } from "react-icons/ai";
import { FiCode } from 'react-icons/fi';
import TypewriterEffect from '@/components/teffect';

const initialJson = {
  appName: "Config Editor",
  version: "1.0.0",
  screens: [
    {
      id: "home",
      title: "Home Screen",
      sections: [
        {
          id: "banner01",
          type: "banner",
          title: "Welcome Banner",
          content: {
            imageUrl: "<https://example.com/welcome.jpg>",
            cta: {
              text: "Explore",
              url: "<https://example.com/explore>"
            }
          },
          visibility: {
            rolesAllowed: ["guest", "member"],
            startDate: "2024-12-01T00:00:00Z",
            endDate: "2025-01-01T23:59:59Z"
          }
        }
      ]
    }
  ]
};

const validRoles = ["guest", "member", "admin"];

export default function JsonEditor() {
  const [jsonValue, setJsonValue] = useState(JSON.stringify(initialJson, null, 2));
  const [originalJson] = useState(JSON.stringify(initialJson, null, 2));
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [darkTheme, setDarkTheme] = useState(true)

  const handleReset = () => {
    setJsonValue(originalJson);
    setValidationErrors([]);
  };

  const handleDownload = () => {
    const blob = new Blob([jsonValue], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "config.json";
    link.click();
  };

  const validateJson = () => {
    try {
      const parsedJson = JSON.parse(jsonValue);
      const errors: string[] = [];

  
      if (!Array.isArray(parsedJson.screens)) {
        errors.push("Screens must be an array.");
      } else {
        const screenIds = new Set();
        // eslint-disable-next-line
        parsedJson.screens.forEach((screen: any, index: number) => {
          if (!screen.id) errors.push(`Screen ${index + 1} is missing an 'id'.`);
          if (!screen.title) errors.push(`Screen ${index + 1} is missing a 'title'.`);
          if (screenIds.has(screen.id)) {
            errors.push(`Duplicate screen ID found: ${screen.id}`);
          } else {
            screenIds.add(screen.id);
          }

          // eslint-disable-next-line
          if (Array.isArray(screen.sections)) {
            const sectionIds = new Set();
            // eslint-disable-next-line
            screen.sections.forEach((section: any, secIndex: number) => {
              if (!section.id) errors.push(`Section ${secIndex + 1} in screen ${screen.id} is missing an 'id'.`);
              if (!section.title) errors.push(`Section ${secIndex + 1} in screen ${screen.id} is missing a 'title'.`);
              if (sectionIds.has(section.id)) {
                errors.push(`Duplicate section ID found in screen ${screen.id}: ${section.id}`);
              } else {
                sectionIds.add(section.id);
              }

          
              if (section.visibility) {
                const { startDate, endDate, rolesAllowed } = section.visibility;
                if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
                  errors.push(`Section ${section.id} in screen ${screen.id} has invalid dates: startDate > endDate.`);
                }
                if (rolesAllowed && !rolesAllowed.every((role: string) => validRoles.includes(role))) {
                  errors.push(`Invalid roles in section ${section.id} of screen ${screen.id}. Allowed roles: ${validRoles.join(", ")}.`);
                }
              }

         
              if (!section.content) {
                errors.push(`Section ${section.id} in screen ${screen.id} is missing a 'content' field.`);
              }
            });
          }
        });
      }

      setValidationErrors(errors);
      return errors.length === 0;
    } catch (error) {
      setValidationErrors(["Invalid JSON format."]);
      console.log(error)
      return false;
    }
  };

  const handleSaveChanges = () => {
    if (validateJson()) {
      alert("Changes are valid and saved!");
    }
  };

  const onChangeThemeColor = () => {
    setDarkTheme(!darkTheme)
  }
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-4 flex items-center">
        <FiCode size="2em" className="mr-5" /> 
        JSON-ify-it : 
        <div className="mx-3 my-2 justify-center items-center ">
            <TypewriterEffect />
          </div>
      </h1>
    
      <div className="mb-4 flex space-x- ">
        <Button className="mr-3" onClick={handleReset}><HiOutlineArrowPath /> Reset</Button>
        <Button className="mr-3" onClick={handleSaveChanges}><AiOutlineSave /> Save Changes</Button>
        <Button className="mr-3" onClick={handleDownload}><HiDocumentArrowDown /> Download</Button>
      
        <div className=" ml-auto">
          <Switch 
          defaultChecked={true}
            onCheckedChange={onChangeThemeColor} 
          />
        </div>
      </div>

     
    {validationErrors.length > 0 && (
      <div className="mb-4">
        {validationErrors.map((error, index) => (
          <Alert key={index}  className="mb-2">
            {error}
          </Alert>
        ))}
      </div>
    )}

   
    <Editor
      height="500px"
      defaultLanguage="json"
      value={jsonValue}
      onChange={(value) => setJsonValue(value || "")}
      theme={darkTheme?"vs-dark":"vs-light"}
      options={{ minimap: { enabled: false }, wordWrap: "on" }}
    />
  </div>
);
}
