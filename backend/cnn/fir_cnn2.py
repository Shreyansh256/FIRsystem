import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Embedding, Conv1D, GlobalMaxPooling1D, Dense

def fir_cnn():
    # Step 1: Load FIR data from Excel database and preprocess it
    fir_data = pd.read_excel('B:/Resume Projects/FIR Detection System/new_Details.xlsx')
    #fir_data = pd.read_excel('C:/Users/91630/OneDrive/Documents/PROJECT/Details.xlsx')
    X = fir_data["FIR Text"]
    y_ipc = fir_data["Section"]

   # Preprocess FIR data
    encoder_ipc = LabelEncoder()
    y_ipc_encoded = encoder_ipc.fit_transform(y_ipc)

    tokenizer = Tokenizer(num_words=1000)
    tokenizer.fit_on_texts(X)
    X_sequences = tokenizer.texts_to_sequences(X)
    X_padded = pad_sequences(X_sequences, maxlen=100)

# Split data into train and test sets
    X_train, X_test, y_train, y_test = train_test_split(X_padded, y_ipc_encoded, test_size=0.2, random_state=42)

# Step 2: Train a CNN model
    model = Sequential()
    model.add(Embedding(input_dim=1000, output_dim=100, input_length=100))
    #model.add(Embedding(input_dim=1000, output_dim=100))
    model.add(Conv1D(128, 5, activation='relu'))
    model.add(GlobalMaxPooling1D())
    model.add(Dense(64, activation='relu'))
    model.add(Dense(len(encoder_ipc.classes_), activation='softmax'))  # Softmax activation for multi-class classification
    model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])

    model.fit(X_train, y_train, epochs=10, batch_size=64, validation_data=(X_test, y_test))
# Get FIR ID from user
    fir_id = input("Enter FIR ID: ")
    #fir_data_info = pd.read_excel("C:/Users/91630/OneDrive/Documents/PROJECT/fir_database.xlsx")
    fir_data_info = pd.read_excel("B:/Resume Projects/FIR Detection System/fir_database.xlsx")

# Retrieve complaint text based on FIR ID
    new_complaint = fir_data_info.loc[fir_data_info['FIR ID'] == fir_id, 'Complaint'].values[0]

# Step 3: Prompt user to provide a new complaint
    print("Compliant:",new_complaint)

# Preprocess the new complaint
    new_complaint_sequence = tokenizer.texts_to_sequences([new_complaint])
    new_complaint_padded = pad_sequences(new_complaint_sequence, maxlen=100)

# Step 4: Predict suitable IPC section for the new complaint
    predicted_ipc_probs = model.predict(new_complaint_padded)
    predicted_ipc_index = predicted_ipc_probs.argmax()
    predicted_ipc_section = encoder_ipc.inverse_transform([predicted_ipc_index])[0]

# Print predicted IPC section
    print("Predicted IPC Section:", predicted_ipc_section)
#fir_cnn()