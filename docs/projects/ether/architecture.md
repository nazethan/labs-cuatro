---
title: Architecture
sidebar_position: 2
---

# Hardware Architecture

E.T.H.E.R. operates on a strictly divided dual-node hardware paradigm to ensure user safety and network security.

## Unit A: The Sentry (Wall Node)
The Sentry handles direct 220V AC mains monitoring and emergency load shedding. It does not connect to the internet.

### Core Components
- **Microcontroller:** ESP32 Development Board
- **Sensor:** PZEM-004T v3.0 (Voltage, Current, Wattage)
- **Power Supply:** Hi-Link HLK-PM01 (220V AC to 5V DC step-down)
- **Actuator:** 5V Relay Module (Normally Open)

### Safety Logic
The Sentry continuously polls the PZEM-004T. If the live wattage exceeds the hardcoded threshold of 2500W, the ESP32 instantly triggers the 5V relay to cut power to the appliance, completely bypassing any cloud latency.

## Unit B: The Avatar (Desk Node)
The Avatar is the user-facing hardware companion. It receives secure telemetry from the Sentry and acts as the bridge to the cloud.

### Core Components
- **Microcontroller:** ESP32 Development Board
- **Display:** 1.3" I2C OLED (SH1106)
- **Illumination:** WS2812B NeoPixel Ring

### The Emotive State Machine
The Avatar translates raw wattage data into "Emotive States," updating both the OLED face and the NeoPixel colors:
| State | NeoPixel Color | Description |
| ----- | -------------- | ----------- |
| Idle | Cyan | Normal background load |
| Happy | Pink | Highly efficient power usage |
| Dizzy | Yellow | Fluctuating power draw |
| Frustrated | Purple | Approaching maximum safe load |
| Angry | Red | Critical overload / Relay Cutoff triggered |