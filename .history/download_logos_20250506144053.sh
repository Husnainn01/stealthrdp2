#!/bin/bash

# Create directory if it doesn't exist
mkdir -p public/images/os

# Download Debian logo
curl -o public/images/os/debian.svg "https://www.debian.org/logos/openlogo.svg"

# Download CentOS logo
curl -o public/images/os/centos.svg "https://upload.wikimedia.org/wikipedia/commons/6/63/CentOS_color_logo.svg"

# Download Rocky Linux logo
curl -o public/images/os/rocky-linux.svg "https://rockylinux.org/assets/images/logo.svg"

# Download AlmaLinux logo
curl -o public/images/os/almalinux.svg "https://almalinux.org/static/d3/images/almalinux-logo.svg"

# Download Ubuntu logo
curl -o public/images/os/ubuntu.svg "https://assets.ubuntu.com/v1/82818cc0-ubuntu_black-red_hex.svg"

# Download Fedora logo
curl -o public/images/os/fedora.svg "https://upload.wikimedia.org/wikipedia/commons/4/41/Fedora_icon_%282021%29.svg"

# Download FreeBSD logo
curl -o public/images/os/freebsd.svg "https://upload.wikimedia.org/wikipedia/commons/4/40/Freebsd_logo.svg"

# Download Alpine Linux logo
curl -o public/images/os/alpine-linux.svg "https://alpinelinux.org/alpinelinux-logo.svg"

# Download Windows logo
curl -o public/images/os/windows.png "https://upload.wikimedia.org/wikipedia/commons/5/5f/Windows_logo_-_2012.svg"

echo "OS logos download complete!" 