import React, { act } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const CommonForm = ({
  action,
  isBtnDisabled,
  formControls,
  buttonText,
  btnType,
  formData,
  setFormData,
  handleFileChange,
}) => {
  const renderInputByComponentType = (getCurrentControl) => {
    let content = null;

    switch (getCurrentControl.contentType) {
      case "input":
        content = (
          <div className="relative flex items-center mt-8">
            <Input
              type="text"
              disabled={getCurrentControl.disabled}
              placeholder={getCurrentControl.placeholder}
              name={getCurrentControl.name}
              id={getCurrentControl.name}
              value={formData[getCurrentControl.name]}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  [event.target.name]: event.target.value,
                })
              }
              className="w-full rounded-md h-[60px] px-4 border dark:bg-black bg-gray-100 text-lg outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:drop-shadow-lg focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 "
            />
          </div>
        );
        break;
        case "file":
            content = (
                <Label
                for = {getCurrentControl.name}
                className = "flex bg-gray-100 dark:bg-black items-center px-3 py-3 mx-auto mt-6 text-center border-2 border-dashed rounded-lg cursor-pointer"
                >
                    <h2>{ getCurrentControl.label}</h2>
                    <Input
                    type="file"
                    id = {getCurrentControl.name}
                    onChange = {handleFileChange}
                    />
                </Label>
            );
            break;
            default:
                content = (
                    <div className="relative flex items-center mt-8">
                      <Input
                        type="text"
                        disabled={getCurrentControl.disabled}
                        placeholder={getCurrentControl.placeholder}
                        name={getCurrentControl.name}
                        id={getCurrentControl.name}
                        value={formData[getCurrentControl.name]}
                        onChange={(event) =>
                          setFormData({
                            ...formData,
                            [event.target.name]: event.target.value,
                          })
                        }
                        className="w-full dark:bg-black rounded-md h-[60px] px-4 border bg-gray-100 text-lg outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:drop-shadow-lg focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                      />
                    </div>
                  );
            break;
            
    }
    return content;
  };
  return (
    <>
      <form action={action}>
        {formControls.map((control) => renderInputByComponentType(control))}
        <div className="mt-6 w-full">
          <Button
            type={btnType || "submit"}
            className="disabled:opacity-60 flex items-center justify-center h-11  px-5"
            disabled={isBtnDisabled}
          >
            {buttonText}
          </Button>
        </div>
      </form>
    </>
  );
};

export default CommonForm;
