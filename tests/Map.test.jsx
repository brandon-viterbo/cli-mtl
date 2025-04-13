import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MockOutlet from "./MockOutlet";
import Map from "../src/components/Map/Map";

describe("Map component", () => {
  it("shows all places on initial visit", () => {
    const mockContext = {
      places: [
        {
          id: 0,
          properties: {
            nom: "A",
            adresse_principale: 0,
            ville: "Montréal",
            arrdondissement: "a_0",
            telephone: 0,
            accessibilite: "a",
            lat: 0,
            long: 0,
          },
        },
        {
          id: 1,
          properties: {
            nom: "B",
            adresse_principale: 1,
            ville: "Montréal",
            arrdondissement: "b_1",
            telephone: 1,
            accessibilite: "b",
            lat: 0,
            long: 0,
          },
        },
      ],
    };
    const { container } = render(
      <MockOutlet context={mockContext}>
        <Map accessFilters={new Set()} neighbourhoodFilters={new Set()} />
      </MockOutlet>,
    );
    expect(container).toMatchSnapshot();
  });

  it("filters on selected accessibility features", () => {
    const mockContext = {
      places: [
        {
          id: 0,
          properties: {
            nom: "A",
            adresse_principale: 0,
            ville: "Montréal",
            arrdondissement: "a_0",
            telephone: 0,
            accessibilite: "acc1",
            lat: 0,
            long: 0,
          },
        },
        {
          id: 1,
          properties: {
            nom: "B",
            adresse_principale: 1,
            ville: "Montréal",
            arrdondissement: "b_1",
            telephone: 1,
            accessibilite: "acc2",
            lat: 0,
            long: 0,
          },
        },
        {
          id: 2,
          properties: {
            nom: "C",
            adresse_principale: 2,
            ville: "Montréal",
            arrdondissement: "b_1",
            telephone: 0,
            accessibilite: "acc1",
            lat: 0,
            long: 0,
          },
        },
      ],
    };

    render(
      <MockOutlet context={mockContext}>
        <Map accessFilters={new Set(["acc1"])} neighbourhoodFilters={new Set()} />
      </MockOutlet>
    )

    expect(screen.queryAllByText("Accessibilité: acc1")).toHaveLength(2);
    expect(screen.queryByText("Accessibilité: acc2")).toBeNull();
  })

  it("filters on selected neighbourhoods", () => {
    const mockContext = {
      places: [
        {
          id: 0,
          properties: {
            nom: "A",
            adresse_principale: 0,
            ville: "Montréal",
            arrdondissement: "a_0",
            telephone: 0,
            accessibilite: "acc1",
            lat: 0,
            long: 0,
          },
        },
        {
          id: 1,
          properties: {
            nom: "B",
            adresse_principale: 1,
            ville: "Montréal",
            arrdondissement: "b_1",
            telephone: 1,
            accessibilite: "acc2",
            lat: 0,
            long: 0,
          },
        },
        {
          id: 2,
          properties: {
            nom: "C",
            adresse_principale: 2,
            ville: "Montréal",
            arrdondissement: "b_1",
            telephone: 0,
            accessibilite: "acc1",
            lat: 0,
            long: 0,
          },
        },
      ],
    };

    render(
      <MockOutlet context={mockContext}>
        <Map accessFilters={new Set()} neighbourhoodFilters={new Set(["a_0"])} />
      </MockOutlet>
    )

    expect(screen.queryAllByText("Arrondissement: a_0")).toHaveLength(1);
    expect(screen.queryByText("Arrondissement: b_1")).toBeNull();
  })

  it("filters on selected accessibility features and neighbourhoods", () => {
    const mockContext = {
      places: [
        {
          id: 0,
          properties: {
            nom: "A",
            adresse_principale: 0,
            ville: "Montréal",
            arrdondissement: "a_0",
            telephone: 0,
            accessibilite: "acc1",
            lat: 0,
            long: 0,
          },
        },
        {
          id: 1,
          properties: {
            nom: "B",
            adresse_principale: 1,
            ville: "Montréal",
            arrdondissement: "b_1",
            telephone: 1,
            accessibilite: "acc2",
            lat: 0,
            long: 0,
          },
        },
        {
          id: 2,
          properties: {
            nom: "C",
            adresse_principale: 2,
            ville: "Montréal",
            arrdondissement: "b_1",
            telephone: 0,
            accessibilite: "acc1",
            lat: 0,
            long: 0,
          },
        },
      ],
    };

    render(
      <MockOutlet context={mockContext}>
        <Map accessFilters={new Set(["acc2"])} neighbourhoodFilters={new Set(["b_1"])} />
      </MockOutlet>
    )

    expect(screen.queryAllByText("Arrondissement: b_1")).toHaveLength(1);
    expect(screen.queryByText("Accessibilité: acc1")).toBeNull();
  })
});
