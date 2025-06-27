import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

function CommonForm({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
  isBtnDisabled,
}) {
  const renderField = (control) => {
    const value = formData[control.name] || "";

    const handleChange = (val) => {
      setFormData({ ...formData, [control.name]: val });
    };

    switch (control.componentType) {
      case "select":
        return (
          <Select value={value} onValueChange={handleChange}>
            <SelectTrigger className="w-full" id={control.name}>
              <SelectValue placeholder={control.label} />
            </SelectTrigger>
            <SelectContent>
              {control.options?.map((option) => (
                <SelectItem key={option.id} value={option.id}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "textarea":
        return (
          <Textarea
            id={control.name}
            name={control.name}
            placeholder={control.placeholder}
            value={value}
            onChange={(e) => handleChange(e.target.value)}
          />
        );

      case "input":
      default:
        return (
          <Input
            id={control.name}
            name={control.name}
            type={control.type}
            placeholder={control.placeholder}
            value={value}
            onChange={(e) => handleChange(e.target.value)}
          />
        );
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-3">
        {formControls.map((control) => (
          <div className="grid w-full gap-1.5" key={control.name}>
            <Label htmlFor={control.name} className="mb-1">
              {control.label}
            </Label>
            {renderField(control)}
          </div>
        ))}
      </div>
      <Button disabled={isBtnDisabled} type="submit" className="mt-2 w-full">
        {buttonText || "Submit"}
      </Button>
    </form>
  );
}

export default CommonForm;

