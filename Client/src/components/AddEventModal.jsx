import styled from "styled-components";
import GlassDatePicker from "./GlassDatePicker";
import { useEffect, useState } from "react";
import AddCategoryModal from "./AddCategoryModal";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const ModalContent = styled.div`
  background: linear-gradient(135deg, #d9e4f5 0%, #f7d9e3 100%);
  backdrop-filter: blur(14px) saturate(180%);
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 10px 32px rgba(6, 15, 142, 0.15);
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  input,
  textarea,
  select,
  button {
    padding: 0.75rem 1rem;
    border-radius: 10px;
    font-size: 0.95rem;
    border: none;
    outline: none;
    transition: all 0.2s ease;
    box-shadow: 4px 4px 5px rgba(0, 0, 0, 0.15);
  }

  input,
  textarea,
  select {
    background: rgba(255, 255, 255, 0.6);
    &:focus {
      background: rgba(255, 255, 255, 0.8);
      box-shadow: 0 0 0 2px #9a4ef1;
    }
  }

  button {
    background: linear-gradient(90deg, #9a4ef1, #ff6ec7);
    color: white;
    font-weight: 600;
    cursor: pointer;
    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(154, 78, 241, 0.4);
    }
  }
`;

const ColorBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;

  input[type="color"] {
    border: none;
    padding: 0;
    width: 50px;
    height: 40px;
    border-radius: 8px;
    cursor: pointer;
  }
`;

function AddEventModal({
  formData,
  setFormData,
  handleAddTask,
  setIsAddModalOpen,
  categories,
  setCategories,
  showAddCategoryModal,
  setShowAddCategoryModal,
}) {
  return (
    <>
      <ModalOverlay>
        <ModalContent>
          <h3 style={{ textAlign: "center", color: "#9a4ef1" }}>
            Add New Task
          </h3>

          <input
            type="text"
            placeholder="Task Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />

          <GlassDatePicker
            selected={formData.start}
            onChange={(date) => setFormData({ ...formData, start: date })}
            placeholder="Start date & time"
          />
          <GlassDatePicker
            selected={formData.end}
            onChange={(date) => setFormData({ ...formData, end: date })}
            placeholder="End date & time"
          />

          <textarea
            placeholder="Task Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />

          <select
            value={formData.category}
            onChange={(e) => {
              if (e.target.value === "add_new") {
                // Open modal for new category
                setShowAddCategoryModal(true);
              } else {
                setFormData({ ...formData, category: e.target.value });
              }
            }}
          >
            <option value="" disabled>
              Select Category
            </option>
            {categories.map((category, id) => {
              return (
                <option key={id} value={category.name}>
                  {category.name}
                </option>
              );
            })}

            <option value="add_new" className="add_new_category">
              ➕ Add New Category
            </option>
          </select>

          <ColorBox>
            <label>Select background color : </label>
            <input
              type="color"
              value={formData.color}
              onChange={(e) =>
                setFormData({ ...formData, color: e.target.value })
              }
            />
          </ColorBox>

          <button onClick={handleAddTask}>Add Task</button>
          <button
            style={{ background: "#ccc", color: "#333" }}
            onClick={() => setIsAddModalOpen(false)}
          >
            Cancel
          </button>
        </ModalContent>
      </ModalOverlay>

      {showAddCategoryModal && (
        <AddCategoryModal
          categories={categories}
          setCategories={setCategories}
          setShowAddCategoryModal={setShowAddCategoryModal}
        />
      )}
    </>
  );
}

export default AddEventModal;
