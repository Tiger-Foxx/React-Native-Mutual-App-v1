import os
import re
import socket
import platform
import subprocess

# Chemin du fichier de configuration (adapte le chemin si nécessaire)
CONFIG_FILE_PATH = os.path.join(os.path.dirname(__file__), 'config', 'config.tsx')

# Fonction pour détecter l'adresse IP de l'ordinateur sur le réseau local
def get_local_ip():
    ip_address = None
    try:
        # Essaie de récupérer l'adresse IP sur une interface réseau en priorisant Wi-Fi
        if platform.system() == "Windows":
            ip_address = get_windows_ip()
        else:
            ip_address = get_linux_ip()
    except Exception as e:
        print("Erreur lors de la détection de l'adresse IP locale :", e)

    return ip_address

# Fonction pour récupérer l'IP sur Windows en priorisant les interfaces Wi-Fi
def get_windows_ip():
    ip_address = None
    try:
        # Récupère la sortie de `ipconfig` et gère les erreurs de décodage
        output = subprocess.check_output("ipconfig", shell=True, encoding='cp850', errors='ignore')
        
        # Recherche d’une adresse IP Wi-Fi
        wifi_match = re.search(r'Wi-Fi.*?Adresse IPv4.*?: (\d+\.\d+\.\d+\.\d+)', output, re.DOTALL)
        if wifi_match:
            ip_address = wifi_match.group(1)
        else:
            # Recherche d’une adresse IP Ethernet si Wi-Fi n'est pas trouvé
            ethernet_match = re.search(r'Ethernet.*?Adresse IPv4.*?: (\d+\.\d+\.\d+\.\d+)', output, re.DOTALL)
            if ethernet_match:
                ip_address = ethernet_match.group(1)
                
    except subprocess.CalledProcessError as e:
        print("Erreur lors de l'exécution de ipconfig :", e)
    return ip_address

# Fonction pour récupérer l'IP sur Linux en priorisant les interfaces Wi-Fi
def get_linux_ip():
    ip_address = None
    try:
        output = subprocess.check_output("ip a", shell=True, encoding='utf-8', errors='ignore')
        
        # Recherche d’une adresse IP Wi-Fi
        wifi_match = re.search(r'inet (\d+\.\d+\.\d+\.\d+)\/\d+.*?wlan', output)
        if wifi_match:
            ip_address = wifi_match.group(1)
        else:
            # Recherche d’une adresse IP Ethernet si Wi-Fi n'est pas trouvé
            ethernet_match = re.search(r'inet (\d+\.\d+\.\d+\.\d+)\/\d+.*?eth', output)
            if ethernet_match:
                ip_address = ethernet_match.group(1)
                
    except subprocess.CalledProcessError as e:
        print("Erreur lors de l'exécution de la commande 'ip a' :", e)
    return ip_address

# Fonction pour mettre à jour l'adresse IP dans le fichier config.tsx
def update_config_file(ip_address):
    try:
        # Lire le fichier et remplacer l'IP
        with open(CONFIG_FILE_PATH, 'r') as file:
            content = file.read()

        new_content = re.sub(r"http://\d+\.\d+\.\d+\.\d+:\d+",
                             f"http://{ip_address}:8000",
                             content)

        # Écrire le contenu mis à jour dans le fichier
        with open(CONFIG_FILE_PATH, 'w') as file:
            file.write(new_content)

        print(f"Le fichier {CONFIG_FILE_PATH} a été mis à jour avec succès : {ip_address}")
    except Exception as e:
        print("Erreur lors de la mise à jour du fichier de configuration :", e)

# Fonction principale
def main():
    ip_address = get_local_ip()
    if ip_address:
        update_config_file(ip_address)
    else:
        print("Impossible de détecter l'adresse IP automatiquement.")
        print("Veuillez éditer le fichier config.tsx manuellement et mettre à jour SERVER_BASE_URL.")
        print(f"Instructions : Remplacez l'adresse IP dans SERVER_BASE_URL par l'adresse IP de votre machine sur le réseau local (par exemple, http://192.168.1.2:8000).")

if __name__ == "__main__":
    main()
