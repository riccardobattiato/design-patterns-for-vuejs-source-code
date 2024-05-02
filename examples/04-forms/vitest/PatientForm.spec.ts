import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/vue";
import PatientForm from "../PatientForm.vue";

describe("PatientForm.vue", () => {
  it("fills out form correctly", async () => {
    render(PatientForm);

    await fireEvent.update(screen.getByLabelText("Name"), "lachlan");
    await fireEvent.update(screen.getByDisplayValue("kg"), "lb");
    await fireEvent.update(screen.getByLabelText("Weight"), "150");

    expect(screen.queryByRole("error")).toBe(null);
  });

  it("shows errors for invalid inputs", async () => {
    render(PatientForm);

    await fireEvent.update(screen.getByLabelText("Name"), "");
    await fireEvent.update(screen.getByLabelText("Weight"), "5");
    await fireEvent.update(screen.getByDisplayValue("kg"), "lb");

    expect(screen.getAllByRole("error")).toHaveLength(2);
  });

  it("emits the patient on submit", async () => {
    const { emitted, getByTestId } = render(PatientForm);
    const form = getByTestId("patient-form");

    await fireEvent.update(screen.getByLabelText("Name"), "riccardo");
    await fireEvent.update(screen.getByLabelText("Weight"), "70");
    await fireEvent.submit(form);

    expect(emitted().submit[0]).toEqual([
      {
        name: "riccardo",
        weight: { value: 70, units: "kg" },
      },
    ]);
  });
});
