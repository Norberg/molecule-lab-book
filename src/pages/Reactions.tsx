import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState, useMemo } from "react";
import "../App.css";
import "../styles/Reactions.css";
import { renderFormulas, renderReaction } from "../utils/formulaUtils";
import { fetchTagDescriptions, TagDescription } from "../data/tagDescriptions";
import Popup from "../components/Popup";
import { FaSearch } from "react-icons/fa";

interface PlayerReaction {
  reactants: string[];
  products: string[];
  description: string;
  tags: string[];
  reactionCount: number;
  reactionPath: string;
  reactionHintPath: string;
}

const fetchReactions = async (): Promise<PlayerReaction[]> => {
  const { data } = await axios.get("http://localhost:8000/reaction");
  return data;
};

interface ReactionCardProps {
  reaction: PlayerReaction;
  tagDescriptions: Record<string, TagDescription> | undefined;
}

const ReactionCard = ({ reaction, tagDescriptions }: ReactionCardProps) => {
  const [popupContent, setPopupContent] = useState<TagDescription | null>(null);
  const [popupAnchor, setPopupAnchor] = useState<DOMRect | null>(null);

  const handleTagClick = (tag: string, event: React.MouseEvent<HTMLButtonElement>) => {
    const buttonRect = event.currentTarget.getBoundingClientRect();
    setPopupAnchor(buttonRect);
    setPopupContent(
      (tagDescriptions && tagDescriptions[tag]) || { title: tag, description: "No description available." }
    );
  };

  const closePopup = () => {
    setPopupContent(null);
    setPopupAnchor(null);
  };

  return (
    <div className="reaction-card">
      <img
        src={`http://localhost:8000/reaction/image/${reaction.reactionPath}`}
        alt="Reaction structure"
        className="reaction-card-image"
      />
      <div className="reaction-card-content">
        <span className="reaction-count-badge">Created {reaction.reactionCount} times</span>
        <h3>Reaction</h3>
        <div className="reaction-formulas">
          {renderReaction(reaction.reactants, reaction.products)}
        </div>
        <p className="reaction-description">
          {renderFormulas(reaction.description)}
        </p>
        <div className="reaction-card-tags">
          {reaction.tags.map((tag) => (
            <button
              key={tag}
              className="tag-button"
              onClick={(event) => handleTagClick(tag, event)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
      {popupContent && popupAnchor && (
        <Popup content={popupContent} anchorRect={popupAnchor} onClose={closePopup} />
      )}
    </div>
  );
};

const Reactions = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: reactionsData, error: reactionsError, isLoading: reactionsLoading } = useQuery<PlayerReaction[]>({
    queryKey: ["playerReactions"],
    queryFn: fetchReactions,
  });

  const { data: tagDescriptionsData } = useQuery<Record<string, TagDescription>>({
    queryKey: ["tagDescriptions"],
    queryFn: fetchTagDescriptions,
  });

  const filteredReactions = useMemo(() => {
    if (!reactionsData) return [];
    if (!searchQuery) return reactionsData;

    const query = searchQuery.toLowerCase();
    return reactionsData.filter((r) => {
      const inReactants = r.reactants.some((mol) => mol.toLowerCase().includes(query));
      const inProducts = r.products.some((mol) => mol.toLowerCase().includes(query));
      const inTags = query.length >= 4 && r.tags.some((tag) => tag.toLowerCase().includes(query));
      return inReactants || inProducts || inTags;
    });
  }, [reactionsData, searchQuery]);

  if (reactionsLoading) return <p>Loading...</p>;
  if (reactionsError) return <p>Error when fetching reactions.</p>;
  if (!reactionsData || reactionsData.length === 0) return (
    <div className="reactions-container">
      <h2>Discovered reactions</h2>
      <p>No reactions discovered yet. Keep experimenting!</p>
    </div>
  );

  return (
    <div className="reactions-container">
      <h2>Discovered reactions</h2>

      <div className="reactions-controls">
        <div className="search-wrapper">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by molecule or tag..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="reactions-list">
        {filteredReactions.map((reaction, index) => (
          <ReactionCard
            key={index}
            reaction={reaction}
            tagDescriptions={tagDescriptionsData}
          />
        ))}
        {filteredReactions.length === 0 && reactionsData.length > 0 && (
          <p className="no-results">No reactions match your search.</p>
        )}
      </div>
    </div>
  );
};

export default Reactions;
