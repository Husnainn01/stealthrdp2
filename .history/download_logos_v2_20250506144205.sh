#!/bin/bash

# Create directory if it doesn't exist
mkdir -p public/images/os

# Clean existing files
rm -f public/images/os/*.svg public/images/os/*.png

# Download OS logos - using more reliable sources
wget -O public/images/os/debian.svg "https://www.vectorlogo.zone/logos/debian/debian-icon.svg"
wget -O public/images/os/centos.svg "https://www.vectorlogo.zone/logos/centos/centos-icon.svg"
wget -O public/images/os/rocky-linux.svg "https://raw.githubusercontent.com/rocky-linux/rockylinux.org/main/src/images/icon-header-white.svg"
wget -O public/images/os/almalinux.svg "https://www.vectorlogo.zone/logos/almalinux/almalinux-icon.svg"
wget -O public/images/os/ubuntu.svg "https://www.vectorlogo.zone/logos/ubuntu/ubuntu-icon.svg"
wget -O public/images/os/fedora.svg "https://www.vectorlogo.zone/logos/getfedora/getfedora-icon.svg"
wget -O public/images/os/freebsd.svg "https://www.vectorlogo.zone/logos/freebsd/freebsd-icon.svg"
wget -O public/images/os/alpine-linux.svg "https://www.vectorlogo.zone/logos/alpinelinux/alpinelinux-icon.svg"
wget -O public/images/os/windows.svg "https://www.vectorlogo.zone/logos/microsoft/microsoft-icon.svg"

echo "OS logos download complete!" 