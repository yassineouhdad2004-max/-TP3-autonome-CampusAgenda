
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList
} from 'react-native';


type Evenement = {
  id: string;
  titre: string;
  categorie: string;
  capacite: number;
  inscrits: number;
};


const evenements: Evenement[] = [
  { id: 'E01', titre: 'Atelier React', categorie: 'Atelier', capacite: 25, inscrits: 25 },
  { id: 'E02', titre: 'Conférence IA', categorie: 'Conférence', capacite: 70, inscrits: 52 },
  { id: 'E03', titre: 'Sécurité mobile', categorie: 'Atelier', capacite: 20, inscrits: 17 },
  { id: 'E04', titre: 'Design UI', categorie: 'Atelier', capacite: 18, inscrits: 9 },
  { id: 'E05', titre: 'Forum projets', categorie: 'Rencontre', capacite: 50, inscrits: 49 },
  { id: 'E06', titre: 'Découverte Git', categorie: 'Atelier', capacite: 24, inscrits: 24 },
];


function placesRestantes(e: Evenement): number {
  return Math.max(0, e.capacite - e.inscrits);
}


function statutEvenement(e: Evenement): string {
  const places = placesRestantes(e);
  let statut = 'Ouvert';

  if (places === 0) {
    statut = 'Complet';
  } else if (places <= 3) {
    statut = 'Presque complet';
  }

  return statut;
}


function BadgeEtat({ statut }: { statut: string }) {
  let couleur = '#D1FAE5';

  if (statut === 'Complet') {
    couleur = '#FECACA';
  } else if (statut === 'Presque complet') {
    couleur = '#FED7AA';
  }

  return (
    <View style={[styles.badge, { backgroundColor: couleur }]}>
      <Text style={styles.texteBadge}>{statut}</Text>
    </View>
  );
}


function CarteEvenement({ evenement }: { evenement: Evenement }) {
  return (
    <View style={styles.carte}>
      <View style={styles.enteteCarte}>
        <View style={styles.informationCarte}>
          <Text style={styles.titreCarte}>
            {evenement.titre}
          </Text>

          <Text style={styles.categorie}>
            {evenement.categorie}
          </Text>
        </View>

        <BadgeEtat statut={statutEvenement(evenement)} />
      </View>

      <Text style={styles.places}>
        {placesRestantes(evenement)} places libres
      </Text>
    </View>
  );
}


function BlocStatistique({
  titre,
  valeur
}: {
  titre: string;
  valeur: number;
}) {
  return (
    <View style={styles.blocStatistique}>
      <Text style={styles.valeurStatistique}>{valeur}</Text>
      <Text style={styles.titreStatistique}>{titre}</Text>
    </View>
  );
}


export default function App() {

  
  const totalEvenements = evenements.length;

  const evenementsComplets = evenements.filter(
    (e) => placesRestantes(e) === 0
  ).length;

  const evenementsDisponibles = evenements.filter(
    (e) => placesRestantes(e) > 0
  ).length;

  const totalPlacesRestantes = evenements.reduce(
    (somme, e) => somme + placesRestantes(e), 0
  );


  const ateliersDisponibles = evenements.filter(
    (e) => e.categorie === 'Atelier' && placesRestantes(e) > 0
  );

 
  const mode: 'tous' | 'ateliers' = 'tous';

  let evenementsAffiches = evenements;

  if (mode === 'ateliers') {
    evenementsAffiches = ateliersDisponibles;
  }

  return (
    <View style={styles.page}>

      {/* En-tête */}
      <Text style={styles.titre}>CampusAgenda</Text>

      <Text style={styles.sousTitre}>
        Événements du campus - IAIL S5
      </Text>

      {/* Statistiques */}
      <View style={styles.statistiques}>

        <BlocStatistique
          titre="Total événements"
          valeur={totalEvenements}
        />

        <BlocStatistique
          titre="Événements complets"
          valeur={evenementsComplets}
        />

        <BlocStatistique
          titre="Événements avec des places"
          valeur={evenementsDisponibles}
        />

        <BlocStatistique
          titre="Places restantes"
          valeur={totalPlacesRestantes}
        />

      </View>

      {/* Titre du mode */}
      <Text style={styles.titreListe}>
        {mode === 'tous'
          ? 'Tous les événements'
          : 'Ateliers disponibles'}
      </Text>

      {/* Liste des événements */}
      <FlatList
        data={evenementsAffiches}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CarteEvenement evenement={item} />
        )}
        ListEmptyComponent={
          <Text style={styles.messageVide}>
            Aucun événement disponible.
          </Text>
        }
      />

    </View>
  );
}


const styles = StyleSheet.create({

  page: {
    flex: 1,
    paddingTop: 56,
    paddingBottom: 20,
    paddingHorizontal: 18,
    backgroundColor: '#F2F7FD'
  },

  titre: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#00235C'
  },

  sousTitre: {
    color: '#4C5360',
    marginTop: 5,
    marginBottom: 18
  },

  statistiques: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 18
  },

  blocStatistique: {
    width: '48%',
    padding: 14,
    borderRadius: 14,
    backgroundColor: '#DCEBFF',
    marginBottom: 10,
    alignItems: 'center'
  },

  valeurStatistique: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00235C'
  },

  titreStatistique: {
    fontSize: 12,
    color: '#4C5360',
    textAlign: 'center',
    marginTop: 4
  },

  titreListe: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00235C',
    marginBottom: 12
  },

  carte: {
    padding: 16,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#DCE5F0'
  },

  enteteCarte: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  informationCarte: {
    flex: 1,
    marginRight: 8
  },

  titreCarte: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#00235C'
  },

  categorie: {
    color: '#4C5360',
    marginTop: 5
  },

  places: {
    color: '#4C5360',
    marginTop: 12,
    fontWeight: '600'
  },

  badge: {
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 20
  },

  texteBadge: {
    color: '#333333',
    fontWeight: 'bold',
    fontSize: 12
  },

  messageVide: {
    textAlign: 'center',
    color: '#4C5360',
    marginTop: 25,
    fontSize: 16
  }

});
