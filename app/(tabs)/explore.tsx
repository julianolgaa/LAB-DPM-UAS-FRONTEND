import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Image,
  TouchableOpacity,
  Button,
  Alert,
} from "react-native";
import { useNavigation } from "expo-router";
import { useTodos } from "@/context/TodoContext";

const bookData = [
    { id: '1', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', content: 'A story of love, wealth, and tragedy in 1920s America.', cover: 'https://books.google.co.id/books/publisher/content?id=G3tlCgAAQBAJ&hl=id&pg=PP1&img=1&zoom=3&bul=1&sig=ACfU3U0WsW18yI5UyyPxXjUeWKxQFu11mQ&w=1280' },
    { id: '2', title: 'To Kill a Mockingbird', author: 'Harper Lee', content: 'A powerful tale of racial injustice in the Deep South.', cover: 'https://books.google.co.id/books/publisher/content?id=_LyTCgAAQBAJ&hl=id&pg=PP1&img=1&zoom=3&bul=1&sig=ACfU3U2PDUkjLubxyTF74uFMhClFwC_0nQ&w=1280' },
    { id: '3', title: '1984', author: 'George Orwell', content: 'A chilling depiction of totalitarianism and surveillance.', cover: 'https://books.google.co.id/books/publisher/content?id=JT_JDAAAQBAJ&hl=id&pg=PP1&img=1&zoom=3&bul=1&sig=ACfU3U2MsxEnlYvYoweHkHNtYR5CpLNAOA&w=1280' },
    { id: '4', title: 'Pride and Prejudice', author: 'Jane Austen', content: 'A timeless romance with sharp social commentary.', cover: 'https://books.google.co.id/books/publisher/content?id=ydULEQAAQBAJ&hl=id&pg=PP1&img=1&zoom=3&bul=1&sig=ACfU3U3SLALO7sdjAvpRnbsE8H5pSuwrVQ&w=1280' },
    { id: '5', title: 'Moby-Dick', author: 'Herman Melville', content: 'A symbolic tale of obsession and revenge.', cover: 'https://books.google.co.id/books/publisher/content?id=ewgYDQAAQBAJ&hl=id&pg=PP1&img=1&zoom=3&bul=1&sig=ACfU3U2Ll5oLcoRRxmRQKIRa0Nt8V3MHpw&w=1280' },
    { id: '6', title: 'War and Peace', author: 'Leo Tolstoy', content: 'A sweeping epic of Russian society during the Napoleonic era.', cover: 'https://books.google.co.id/books/content?id=s-OQ2yHDIMQC&hl=id&pg=PP1&img=1&zoom=3&bul=1&sig=ACfU3U3WAAy7S4B6uodb7xybV-Qh-0Wa7g&w=1280' },
    { id: '7', title: 'The Catcher in the Rye', author: 'J.D. Salinger', content: 'A coming-of-age story with themes of alienation.', cover: 'https://books.google.co.id/books/publisher/content?id=mZunDwAAQBAJ&hl=id&pg=PP1&img=1&zoom=3&bul=1&sig=ACfU3U07lP3riniWKMhZBYyJJ6DAX_jcFg&w=1280' },
    { id: '8', title: 'The Hobbit', author: 'J.R.R. Tolkien', content: 'A tale of adventure, bravery, and friendship.', cover: 'https://upload.wikimedia.org/wikipedia/en/4/4a/TheHobbit_FirstEdition.jpg' },
    { id: '9', title: 'Jane Eyre', author: 'Charlotte Brontë', content: 'A strong heroine’s journey of independence and love.', cover: 'https://books.google.co.id/books/publisher/content?id=v1JFDwAAQBAJ&hl=id&pg=PP1&img=1&zoom=3&bul=1&sig=ACfU3U1Vi5HHoOsm5Wm6T72ognHSgsXNkQ&w=1280' },
    { id: '10', title: 'Frankenstein', author: 'Mary Shelley', content: 'A gothic tale of ambition and scientific hubris.', cover: 'https://upload.wikimedia.org/wikipedia/commons/3/35/Frankenstein_1818_edition_title_page.jpg' },
    { id: '11', title: 'The Alchemist', author: 'Paulo Coelho', content: 'A magical story about following your dreams.', cover: 'https://books.google.co.id/books/publisher/content?id=v1JFDwAAQBAJ&hl=id&pg=PP1&img=1&zoom=3&bul=1&sig=ACfU3U1Vi5HHoOsm5Wm6T72ognHSgsXNkQ&w=1280' },
    { id: '12', title: 'The Odyssey', author: 'Homer', content: 'An epic tale of heroism and adventure.', cover: 'https://books.google.co.id/books/content?id=U2Jovv1NuMsC&hl=id&pg=PP1&img=1&zoom=3&bul=1&sig=ACfU3U2UllFTS9kiuy4g14DZqUTPxZhHzg&w=1280' },
    { id: '13', title: 'The Divine Comedy', author: 'Dante Alighieri', content: 'A journey through Hell, Purgatory, and Paradise.', cover: 'https://books.google.co.id/books/content?id=wmacUwleJv8C&hl=id&pg=PA3&img=1&zoom=3&bul=1&sig=ACfU3U0XGiCr3aAkBB6yM65RoKgcI5OVUA&w=1280' },
    { id: '14', title: 'Les Misérables', author: 'Victor Hugo', content: 'A story of redemption and revolution in 19th-century France.', cover: 'https://books.google.co.id/books/publisher/content?id=0cGZAwAAQBAJ&hl=id&pg=PP1&img=1&zoom=3&bul=1&sig=ACfU3U0VAKDSdITUwkJtZiNek1s81xdTNA&w=1280' },
    { id: '15', title: 'The Brothers Karamazov', author: 'Fyodor Dostoevsky', content: 'A philosophical exploration of faith, doubt, and morality.', cover: 'https://books.google.co.id/books/content?id=BZvXZ1au0VcC&hl=id&pg=PP1&img=1&zoom=3&bul=1&sig=ACfU3U3ZPCCcnXmbJ-x3hf7nUeljFK6tFQ&w=1280' },
    { id: '16', title: 'Wuthering Heights', author: 'Emily Brontë', content: 'A dark and passionate tale of love and revenge.', cover: 'https://books.google.co.id/books/content?id=7wXy0iWQhmUC&hl=id&pg=PR1&img=1&zoom=3&bul=1&sig=ACfU3U3kSq_nwsSPoojWlzbycH4ioDqATQ&w=1025' },
    { id: '17', title: 'Brave New World', author: 'Aldous Huxley', content: 'A dystopian novel exploring themes of technology and control.', cover: 'https://upload.wikimedia.org/wikipedia/en/6/62/BraveNewWorld_FirstEdition.jpg' },
    { id: '18', title: 'The Picture of Dorian Gray', author: 'Oscar Wilde', content: 'A cautionary tale about vanity and moral corruption.', cover: 'https://books.google.co.id/books/content?id=Us0gTQUSAvsC&hl=id&pg=PP1&img=1&zoom=3&bul=1&sig=ACfU3U209mbQPAYifl7DZTpm7oE47Yel7w&w=1280' },
    { id: '19', title: 'Anna Karenina', author: 'Leo Tolstoy', content: 'A tragic story of love and infidelity.', cover: 'https://books.google.co.id/books/publisher/content?id=MZw6DAAAQBAJ&hl=id&pg=PP1&img=1&zoom=3&bul=1&sig=ACfU3U1wCPZlaECia6yG5-reonINbDkMfQ&w=1280' },
    { id: '20', title: 'Dracula', author: 'Bram Stoker', content: 'A classic horror story of the infamous vampire.', cover: 'https://books.google.co.id/books/content?id=8U49ADLcL0EC&hl=id&pg=PP1&img=1&zoom=3&bul=1&sig=ACfU3U2obZU9yQHZKzSOnNByyxwF2Ti9Bg&w=1280' },
  ];
  

const ExploreScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { addTodo } = useTodos();
  const navigation = useNavigation();

  const filteredBooks = bookData.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddToTodos = (book) => {
    addTodo(book);
    Alert.alert("Success", `${book.title} has been added to Todos!`);
  };

  const renderBook = ({ item }) => (
    <View style={styles.bookContainer}>
      <TouchableOpacity
       style={styles.bookDetails}
       onPress={() =>
         navigation.navigate("book-detail", {
           id: item.id,
           title: item.title,
           author: item.author,
           content: item.content,
           cover: item.cover,
         })
       }
     >
       <Image source={{ uri: item.cover }} style={styles.bookCover} />
       <View style={styles.bookInfo}>
         <Text style={styles.bookTitle}>{item.title}</Text>
         <Text style={styles.bookAuthor}>{item.author}</Text>
       </View>
      </TouchableOpacity>
      <Button title="Add" onPress={() => handleAddToTodos(item)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search books..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredBooks}
        renderItem={renderBook}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
      <Button title="Go to Todos" onPress={() => navigation.navigate("index")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  searchBar: { height: 40, borderColor: "#ccc", borderWidth: 1, borderRadius: 8, paddingHorizontal: 12, marginBottom: 16 },
  list: { paddingBottom: 16 },
  bookContainer: { flexDirection: "row", alignItems: "center", marginBottom: 16, padding: 8, backgroundColor: "#f9f9f9", borderRadius: 8 },
  bookDetails: { flex: 1, flexDirection: "row", alignItems: "center" },
  bookCover: { width: 60, height: 90, borderRadius: 4, marginRight: 12 },
  bookInfo: { flex: 1 },
  bookTitle: { fontSize: 16, fontWeight: "bold" },
  bookAuthor: { fontSize: 14, color: "#555" },
});

export default ExploreScreen;
