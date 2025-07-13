import { Ionicons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import {
  Alert,
  Animated,
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

const TodoScreen = () => {
  const [todos, setTodos] = useState([
    { id: "1", text: "Complete project proposal", completed: false },
    { id: "2", text: "Review team feedback", completed: true },
    { id: "3", text: "Schedule client meeting", completed: false },
    { id: "4", text: "Update documentation", completed: false },
  ]);
  const [inputText, setInputText] = useState("");
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const addTodo = () => {
    if (inputText.trim()) {
      const newTodo = {
        id: Date.now().toString(),
        text: inputText.trim(),
        completed: false,
      };
      setTodos([newTodo, ...todos]);
      setInputText("");

      // Animate new item
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        fadeAnim.setValue(0);
      });
    }
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    Alert.alert("Delete Todo", "Are you sure you want to delete this todo?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => setTodos(todos.filter((todo) => todo.id !== id)),
      },
    ]);
  };

  const completedCount = todos.filter((todo) => todo.completed).length;
  const totalCount = todos.length;

  const renderTodoItem = ({ item, index }) => {
    const animatedValue = useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 300,
        delay: index * 100,
        useNativeDriver: true,
      }).start();
    }, []);

    return (
      <Animated.View
        style={[
          styles.todoItem,
          {
            opacity: animatedValue,
            transform: [{
              translateY: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [50, 0],
              }),
            }],
          },
        ]}
      >
        <TouchableOpacity
          style={styles.todoContent}
          onPress={() => toggleTodo(item.id)}
          activeOpacity={0.7}
        >
          <View style={[
            styles.checkbox,
            item.completed && styles.checkboxCompleted
          ]}>
            {item.completed && (
              <Ionicons name="checkmark" size={16} color="#fff" />
            )}
          </View>
          <Text style={[
            styles.todoText,
            item.completed && styles.todoTextCompleted
          ]}>
            {item.text}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deleteTodo(item.id)}
          activeOpacity={0.7}
        >
          <Ionicons name="trash-outline" size={20} color="#ff6b6b" />
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#667eea" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Tasks</Text>
        <Text style={styles.headerSubtitle}>
          {completedCount} of {totalCount} completed
        </Text>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                // { width: ${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}% }
              ]}
            />
          </View>
        </View>
      </View>

      {/* Add Todo Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Add a new task..."
          placeholderTextColor="#a0a0a0"
          value={inputText}
          onChangeText={setInputText}
          onSubmitEditing={addTodo}
          returnKeyType="done"
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={addTodo}
          activeOpacity={0.8}
        >
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Todo List */}
      <FlatList
        data={todos}
        renderItem={renderTodoItem}
        keyExtractor={(item) => item.id}
        style={styles.todoList}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />

      {/* Empty State */}
      {todos.length === 0 && (
        <View style={styles.emptyState}>
          <Ionicons name="checkmark-circle-outline" size={80} color="#e0e0e0" />
          <Text style={styles.emptyStateText}>No tasks yet</Text>
          <Text style={styles.emptyStateSubtext}>
            Add a task to get started
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    backgroundColor: "#667eea",
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    shadowColor: "#667eea",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    marginBottom: 15,
  },
  progressContainer: {
    marginTop: 10,
  },
  progressBar: {
    height: 6,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#fff",
    borderRadius: 3,
  },
  inputContainer: {
    flexDirection: "row",
    margin: 20,
    backgroundColor: "#fff",
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 15,
    color: "#333",
  },
  addButton: {
    backgroundColor: "#667eea",
    borderRadius: 12,
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  todoList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  listContent: {
    paddingBottom: 20,
  },
  todoItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginBottom: 12,
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  todoContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#e0e0e0",
    marginRight: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxCompleted: {
    backgroundColor: "#4caf50",
    borderColor: "#4caf50",
  },
  todoText: {
    fontSize: 16,
    color: "#333",
    flex: 1,
  },
  todoTextCompleted: {
    textDecorationLine: "line-through",
    color: "#999",
  },
  deleteButton: {
    padding: 8,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 100,
  },
  emptyStateText: {
    fontSize: 24,
    fontWeight: "600",
    color: "#999",
    marginTop: 20,
  },
  emptyStateSubtext: {
    fontSize: 16,
    color: "#ccc",
    marginTop: 8,
  },
});

export default TodoScreen;
